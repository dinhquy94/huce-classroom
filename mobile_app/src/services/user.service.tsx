import Keychain from 'react-native-keychain'
import {
  apiGetCurrentInfo, apiUpdateUserInfo
} from './config'
import request from './request'

export const getMeApi = async (): Promise<any> => {
  try {
    const token = await Keychain.getGenericPassword({
      service: 'accessToken',
    }).then(res => {
      if (res) return res.password
      return ''
    })
    const result = await request(token).get(apiGetCurrentInfo)
    return result.data;
  } catch (error) {

  }
}

export const updateUserApi = async (userId:any, dataToUpdate: any): Promise<any> => {
  try {
    const token = await Keychain.getGenericPassword({
      service: 'accessToken',
    }).then(res => {
      if (res) return res.password
      return ''
    })
    const result = await request(token).patch(apiUpdateUserInfo.replace("{userId}", userId), dataToUpdate)
    return result.data;
  } catch (error) {
    return null;
  }
}

