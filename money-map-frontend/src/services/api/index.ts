import {moneyMapClient} from './clients/moneyMapClient';
import {createHttpWrapper} from './http';

export const moneyMapApi = createHttpWrapper(moneyMapClient);