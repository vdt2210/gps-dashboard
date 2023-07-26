export interface IDeviceInfo {
  id: string;
  isActivated: boolean;
  createdDate: Date;
  lastUpdated: Date;
  name: string | null;
  os: string;
  platform: string;
  uid: string;
}

export type TDeviceInfo = Pick<
  IDeviceInfo,
  'id' | 'isActivated' | 'createdDate' | 'lastUpdated' | 'name' | 'os' | 'platform' | 'uid'
>;

export type TDeviceInfoDTO = Pick<IDeviceInfo, 'id' | 'isActivated' | 'uid'> &
  Partial<Pick<IDeviceInfo, 'name' | 'os' | 'platform'>>;
