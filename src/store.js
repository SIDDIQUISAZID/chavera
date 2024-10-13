import { configureStore } from '@reduxjs/toolkit'
import tabManager from '../src/features/tabManager';
import modalManager from './features/modalManager';
import loginManager from './features/loginManager';
import testcaseManager from './features/testCaseManager';
import editDeviceManager from './features/iPerfConfigManager'
import deviceManager from './features/deviceManager'


export default configureStore({
  reducer: {
    activeTab : tabManager,
    activeModal: modalManager,
    loginManager : loginManager,
    testcaseManager : testcaseManager,
    editDeviceManager:editDeviceManager,
    deviceManager:deviceManager
  

  },
})

