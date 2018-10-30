/**
 * Created by jimmy on 2018/6/5.
 */
import io from './io';
import config from './config';
import { urlEncode } from '../utils/utils'
const baseUrl = config.domain;
export const getHealthData = (params) => {return io.get(`${baseUrl}/HealthData/GetRecordInfo?${urlEncode(params)}`)};
export const GetUrineRecordInfo = (params) => {return io.get(`${baseUrl}/HealthData/GetUrineRecordInfo?${urlEncode(params)}`)};
export const GetBloodRecordInfo = (params) => {return io.get(`${baseUrl}/HealthData/GetBloodRecordInfo?${urlEncode(params)}`)};
export const getPositionLine = (params) => {return io.get(`${baseUrl}/HealthData/GetPositioningData?${urlEncode(params)}`)};
export const getPersonList = (params) => {return io.get(`${baseUrl}/business/GetPersonList?${urlEncode(params)}`)};
export const getHeartElectronic = (params) => {return io.get(`${baseUrl}/HealthData/GetEcgInfo?${urlEncode(params)}`)};
