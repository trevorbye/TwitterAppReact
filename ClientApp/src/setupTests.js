import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { login, msalApp } from './components/auth-utils/auth-config';

async function getLogin(msalApp) {
    await login(msalApp);
}
getLogin(msalApp);

global.msalTestMockAuth = {
    msalConfig: msalApp
};

configure({ adapter: new Adapter() });