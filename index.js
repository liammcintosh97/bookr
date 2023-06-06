import API from './api.js'
import moment from 'moment';


export default class Bookr {
  constructor(config){
    this.config = config
    
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config.headers
    }
  
    this.api = new API(config.baseURL,headers)
    
    this.getBookings = this.getBookings.bind(this)
  }

  async getBookings(date,otherParams){
    return new Promise(async(resolve,reject)=>{
      try{
        let params = {
          ...otherParams,
          date: moment(date).format(this.config.dateFormat)
        }

        console.log(params)

        const methodType = this.config.endPoints.getBookings.methodType
        const url = this.config.endPoints.getBookings.url
        const data = await this.api.call(methodType,url,params)
        return resolve(data)
      }
      catch(e){
        return reject(e)
      }
    })
  }
}




  
