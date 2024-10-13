import ToastService from "../components/Toast/ToastService";

import * as Utils from './utils/utils'
import axios from "axios";

let ApiDomain = 'http://3.132.117.230';
let portService = ':8081/user-service/api/v1/'
let portServiceLogin = ':8082/'
let portTestCase = ':8084/testmanagement-service/api/v1/'

export const Api = {
    async fetch(service, path, options = {}) {
        try {
            let {method , data , headers} = options;
            let response;
            if(method === "GET")
             response = await axios.get(`${ApiDomain}${service}${path}`);
            else if(method === "POST")
            {
            response = await axios.post(`${ApiDomain}${service}${path}`, data);
            }else if(method === "DELETE")
            {
            response = await axios.delete(`${ApiDomain}${service}${path}`, data);
            }else {
                response = await axios.put(`${ApiDomain}${service}${path}`, data );
            }
            
            if (response.status === 200) {
              
                const queryError = await Utils.handleQueryError(response.data);
                if (queryError) return undefined;
                return response.data;
              
            }
            else {
                ToastService.Toast("error", `${response.message} Error: ${ApiDomain}/${path}`, 5000);
                console.error(`${response.status} Error:`, response);
                return undefined;
            }
        } catch (err) {
            if(err.code==='ERR_BAD_REQUEST'){
                ToastService.Toast("error", `${err.response.data.message}` , 5000);
                console.error(err);
            return undefined;
            }
            ToastService.Toast("error", `${err.message}` , 5000);
            console.error(err);
            return undefined;
        }
        
    },
    async fetchExternal(path, options = {}) {
        let response = await fetch(`${path}`, options);
        // if response is ok check for queryErrors
        if (response.status === 200) {
            let json = await response.json();
            // parse json here and return it with the response
            response._json = json;
            response.json = () => new Promise(resolve => {
                resolve(response._json);
            });
            // Toast if query error and return undefined
            const queryError = await Utils.handleQueryError(json);
            if (queryError) return undefined;
            return response;
        }
        // throw an error and return undefined if status is not ok
        else {
            ToastService.Toast("error", `${response.status} Error: ${ApiDomain}/${path}`);
            console.error(`${response.status} Error:`, response);
            return undefined;
        }
    },

    async signUser(localpath , postData) {
        return await this.fetch(portService , `${localpath}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            data: postData,
        });
    },

    async postData(localpath , postData) {
        let path = `${ApiDomain}${portService}${localpath}`
        let res = await axios.post( path,postData)
                .then((res)=>{
                    return res;
                })
                .catch((error)=>{
                    return error;
                });
        
                return res;
            },
        
               

    async checkEmailExists(localpath , email) {
        return await this.fetch(portService , `${localpath}?email=${email}`, {
            method: 'GET',
            credentials: 'include'
        });
    },

  

  
    async sendOtp(localpath , email) {
        return await this.fetch(portService , `${localpath}?email=${email}`, {
            method: 'POST',
            credentials: 'include',
        });
    },

    async updatePassword(localpath , data , token) {
        return await this.fetch(portService , `${localpath}?newPassword=${data.newPassword}&oldPassword=${data.oldPassword}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', // Example header, adjust as needed
                'Authorization': token, // Example authorization header, adjust as needed
                // Add any other headers you want to send
              }
              

        });
    },
    async  getDetailsByExecutionId (SelectedTestCase)  {
        return await this.fetch(portTestCase , `testmanagement/get-testcase?id=${SelectedTestCase}`, {
            method: 'GET',
            credentials: 'include'
        });
      },


    async  fetchIterationData (SelectedTestCase , page , size)  {
        return await this.fetch(portTestCase , `executionResult?executionId=${SelectedTestCase}&page=${page}&size=${size}`, {
            method: 'GET',
            credentials: 'include'
        });
      },

    async fetchExecutedTestCase  (page , size) {
        return await this.fetch(portTestCase , `execution?&page=${page}&size=${size}`, {
            method: 'GET',
            credentials: 'include'
        });
      },

    async fetchTestCaseData  (page , size) {
        return await this.fetch(portTestCase,`testmanagement/testcases?&page=${page}&size=${size}`, {
            method: 'GET',
            credentials: 'include'
        });
      },

    async fetchDeviceData (page , size) {
        return await this.fetch(portTestCase,`devices/all?&page=${page}&size=${size}`, {
            method: 'GET',
            credentials: 'include'
        });
    },

    async fetchTestcaseDataByData (testcaseId) {
        return await this.fetch(portTestCase,`testmanagement/testcases-by-id?testIds=${testcaseId}`,{
            method: 'GET',
            credentials: 'include'
        });
    },

    async fetchDeviceDataByData (deviceId) {
        return await this.fetch(portTestCase,`devices/${deviceId}`,{
            method: 'GET',
            credentials: 'include'
        });
    },


    async fetchDeviceCount () {
        return await this.fetch(portTestCase,`devices/count`, {
            method: 'GET',
            credentials: 'include'
        });
    },

    async fetchIperfData (page,size) {
        return await this.fetch(portTestCase,`iperfConfig?&page=${page}&size=${size}`, {
            method: 'GET',
            credentials: 'include'
        });
    },

    async fetchIperfDataByData (iperfConfigId) {

        return await this.fetch(portTestCase,`iperfConfig/${iperfConfigId}`,{
            method: 'GET',
            credentials: 'include'
        });
    },

    async testCaseExecution(testcaseId) {

        return await this.fetch(portTestCase ,`execution`, {
            data : {
                testcaseId : testcaseId},
            method: 'POST',
            credentials: 'include',
        });
    },


    async executeTestCase(testCasedata) {


        return await this.fetch(portTestCase ,`execution/execute`, {
            data : testCasedata,
            method: 'PUT',
            credentials: 'include',
        });
    },

    async createDevice(deviceData) {
        const endpoint = `${portTestCase}devices/save`;
        try {
            const response = await axios.post(`${ApiDomain}${endpoint}`,deviceData);
            if (response.status === 200) {
                return response.data;
            } else {
                console.error(`${response.status} Error:`, response);
                ToastService.Toast("error", `${response.status} Error: ${ApiDomain}/${endpoint}`, 5000);
                return undefined;
            }
        } catch (error) {
            console.error(error);
            ToastService.Toast("error", `${error.response.data.message}`, 5000);
            return undefined;
        }
    },

    async createTestCase(testCaseDetails) {
        return await this.fetch(portTestCase ,`testmanagement`, {
            data :testCaseDetails,
            method: 'POST',
            credentials: 'include',
        });
    },

    async deleteDeviceDetails(deviceDetails){
        return await this.fetch(portTestCase ,`devices/update`, {
            data : deviceDetails,
            method: 'PUT',
            credentials: 'include',
        });
    },

    async deleteTestCaseDetails(testCase){

        return await this.fetch(portTestCase ,`testmanagement`, {
            data :testCase,
            method: 'POST',
            credentials: 'include',
        });
    },

    async editDeviceDetails(deviceDetails){
        return await this.fetch(portTestCase ,`devices/update`, {
            data : deviceDetails,
            method: 'PUT',
            credentials: 'include',
        });

    },

    async editTestCaseDetails(testCaseDetails){
        return await this.fetch(portTestCase ,`testmanagement`, {
            data :testCaseDetails,
            method: 'POST',
            credentials: 'include',
        });

    },

    async fetchGraphPerIteration  (execId , iteNum) {
        return await this.fetch(portTestCase , `iperfResult?executionId=${execId}&iterationNumber=${iteNum}`, {
            method: 'GET',
            credentials: 'include'
        });
      },

    async resetPassword(localpath , data ) {
        return await this.fetch(portService , `${localpath}`, {
            method: 'PUT',
            credentials: 'include',
              data: data

        });
    },
    async saveUser(localpath , outputData) {
        let path = `http://10.10.19.88:8080/user-service/api/v1/${localpath}`
        let res = await axios.post(path,outputData)
                .then((res)=>{
                    return res;
                })
                .catch((error)=>{
                    return error;
                });
        
                return res;
    },

    async verifyOtpFromEmail(localpath,txId,otp,id) {
        console.log(`${localpath}?txnId=${txId}&otp=${otp}&userId=${id}`);
        return await this.fetch(portService , `${localpath}?txnId=${txId}&otp=${otp}&userId=${id}`, {
            method: 'POST',
            credentials: 'include',
        });
    },

    async downloadIterationExcel(requestBody) {  
        // Assuming the URL stays the same but the method changes to POST
        const url = `http://3.132.117.230:8084/testmanagement-service/api/v1/executionResult/downloadFile`;
        try {
          const response = await fetch(url, {
            method: 'POST', // Changed to POST
            headers: {
              'Content-Type': 'application/json', // Changed to application/json for JSON request body
            },
            body: JSON.stringify(requestBody), // Adding the request body
          });
      
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
      
          const blob = await response.blob();
          const contentDisposition = response.headers.get('Content-Disposition');
          let fileName = ''; // Default filename if none is found
      
          if (contentDisposition) {
            const matches = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
            if (matches && matches.length > 1) {
              fileName = matches[1].replace(/['"]/g, ''); // Remove any surrounding quotes
            }
          }
      
          // Initiating download process
          const downloadUrl = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = downloadUrl;
          a.download = fileName || 'downloadedFile'; // Fallback filename if none is provided
          document.body.appendChild(a);
          a.click();
      
          window.URL.revokeObjectURL(downloadUrl);
          document.body.removeChild(a);
        } catch (error) {
          console.error('Download failed:', error.message);
        }
      },

    async downloadIterationLogs(requestBody) {  
        // Assuming the URL stays the same but the method changes to POST
        const url = `http://3.132.117.230:8084/testmanagement-service/api/v1/executionFile/downloadFiles`;
      
      
        try {
          const response = await fetch(url, {
            method: 'POST', // Changed to POST
            headers: {
              'Content-Type': 'application/json', // Changed to application/json for JSON request body
            },
            body: JSON.stringify(requestBody), // Adding the request body
          });
      
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
      
          const blob = await response.blob();
          const contentDisposition = response.headers.get('Content-Disposition');
          let fileName = ''; // Default filename if none is found
      
          if (contentDisposition) {
            const matches = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
            if (matches && matches.length > 1) {
              fileName = matches[1].replace(/['"]/g, ''); // Remove any surrounding quotes
            }
          }
      
          // Initiating download process
          const downloadUrl = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = downloadUrl;
          a.download = fileName || 'downloadedFile'; // Fallback filename if none is provided
          document.body.appendChild(a);
          a.click();
      
          window.URL.revokeObjectURL(downloadUrl);
          document.body.removeChild(a);
        } catch (error) {
          console.error('Download failed:', error.message);
        }
      },
    

    async login(localpath,userData){
        // let path = `${ApiDomain}${portService}${localpath}`
        let path = 'http://3.132.117.230:8083/identity-service/auth/login'
        let res = await axios.post(path,userData)
        .then((res)=>{
            return res;
        })
        .catch((error)=>{
            return error;
        });

        return res.data;
    },

    async addIperfConfig(configData) {
        return await this.fetch(portTestCase ,`iperfConfig`, {
            data :configData,
            method: 'POST',
            credentials: 'include',
        });
    },
    async updateIperfConfig(configData){
        return await this.fetch(portTestCase ,`iperfConfig`, {
            data : configData,
            method: 'POST',
            credentials: 'include',
        });

    },
    async deleteIperfConfigById(iperfConfigId){
        return await this.fetch(portTestCase ,`iperfConfig/${iperfConfigId}`, {
            method: 'DELETE',
            credentials: 'include',
        });

    },

 
};

