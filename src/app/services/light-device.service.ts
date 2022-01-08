import { Injectable, OnDestroy } from '@angular/core';
import { DeepstreamClient } from '@deepstream/client';
import { Record } from '@deepstream/client/dist/src/record/record';
import { List } from '@deepstream/client/dist/src/record/list';
import { EVENT } from '@deepstream/client/dist/src/constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { includes, sortBy, trimEnd } from 'lodash';

const DEVICES_ROOT = 'light-control/devices';
const RECORD_LIST_PATH = 'iw-introspection/records/' + DEVICES_ROOT + '/.iw-index';

@Injectable()
export class LightDeviceService implements OnDestroy {

  private ds: DeepstreamClient;
  private listRecord: List;
  private readonly records: Map<string, Record> = new Map();
  private readonly devices: BehaviorSubject<Array<Observable<any>>> = new BehaviorSubject([]);

  constructor() {
    const hostname = '192.168.1.230';
    this.ds = new DeepstreamClient(hostname + ':6020');
    this.ds.login().then(() => this.subscribeToListOfDevices());
  }

  get devices$(): Observable<Array<Observable<any>>> {
    return this.devices;
  }

  private async subscribeToListOfDevices() {
    this.listRecord = this.ds.record.getList(RECORD_LIST_PATH);
    this.listRecord.subscribe((entries) => {
      this.updateDevices(entries);
    });
    this.listRecord.on(EVENT.RECORD_DELETED, () => {
      console.log('cron job index record deleted. resubscribing ...');
      setTimeout(() => this.subscribeToListOfDevices());
    });
    await this.listRecord.whenReady();
    console.log('successfully subscribed to list of devices at', RECORD_LIST_PATH);
    this.updateDevices(this.listRecord.getEntries());
  }

  ngOnDestroy(): void {
    this.listRecord.discard();
    this.ds.close();
  }

  async setDevice(deviceName: string, state: any) {
    const record = this.ds.record.getRecord(`${DEVICES_ROOT}/${deviceName}/set`);
    await record.whenReady();

    for (const key of Object.keys(state)) {
      record.set(key, state[key], (err) => {
        if (err) {
          console.error('failed to update record for', deviceName, err);
        }
        record.discard();
      });
    }
  }

  private updateDevices(deviceNames: string[]) {
    for (const deviceName of deviceNames) {
      if ( ! this.records.has(deviceName) && deviceName.endsWith('/')) {
        const record = this.ds.record.getRecord(`${DEVICES_ROOT}/${deviceName}is`);
        this.records.set(deviceName, record);
      }
    }

    for (const deviceName of this.records.keys()) {
      if ( ! includes(deviceNames, deviceName)) {
        this.records.get(deviceName).discard();
        this.records.delete(deviceName);
      }
    }

    this.devices.next(sortBy([...this.records.keys()]).map(deviceName =>
        this.makeRecordObservable(deviceName, this.records.get(deviceName))));
  }

  private makeRecordObservable(deviceName: string, record: Record) {
    return new Observable(subscriber => {
      const cb = (data: any) => subscriber.next({...data, $name: trimEnd(deviceName, '/') });
      record.subscribe(cb, true);
      record.on(EVENT.RECORD_DISCARDED, () => subscriber.complete());
      return () => record.unsubscribe(cb);
    });
  }
}
