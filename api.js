export default class API {
  constructor(baseURL,headers){
    this.baseURL = baseURL
    this.headers = headers
    this.log = true

    this.call = this.call.bind(this) 
  }

  call(methodType,endpoint,parameters){
    const options = {
      method: methodType,
      headers: this.headers
    }
    const url = this.baseURL + endpoint + formatQueryString(parameters)
    if(this.log){
      console.log(`${methodType}_HEADERS - `,this.headers)
      console.log(`${methodType}_PARAMETERS - `,parameters)
      console.log(`${methodType}_URL - `,url)
    }
    
    return new Promise((resolve,reject)=>{
      fetch(url,options)
      .then(async(res)=>{
          const data = await res.json()
          if(this.log) console.log("BOOKR_SDK_API_RESPONSE_DATA - ",data)
          resolve(data)
      })
      .catch((e)=>{reject(e)})
    })
  }
}

function formatQueryString(parameters){
  if(!parameters) return ""
  
  var queryString = "?"
  var i = 0

  for(const prop in parameters){
    if(typeof parameters[prop] === 'object'){
      queryString += formatObjectQueryString(prop,parameters[prop])
    }
    else queryString += `${prop}=${parameters[prop]}`
    
    if(i < Object.keys(parameters).length - 1) queryString += "&"
    i++
  }

  return queryString
}

function formatObjectQueryString(name,object){
  var string = ""
  var i = 0

  for(const prop in object){
    if(object[prop]){
      string += `${name}[${prop}]=${object[prop]}`

      if(i < Object.keys(object).length - 1) string += "&"
      i++
    }
    
  }

  return string
}