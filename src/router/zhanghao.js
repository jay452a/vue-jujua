import temperature from '@/page/manage/temperature';
import bloodPressure from '@/page/manage/bloodPressure';
import bloodSugar from '@/page/manage/bloodSugar';
import bloodO2 from '@/page/manage/bloodO2';
import pulse from '@/page/manage/pulse';
import heartElectric from '@/page/manage/heartElectric';
import heightAndWeight from '@/page/manage/heightAndWeight';
import routineUrineTest from '@/page/manage/routineUrineTest';
import routineBloodTest from '@/page/manage/routineBloodTest';
import position from '@/page/youxianElderlyCare/position';
import reviewRound from '@/page/youxianElderlyCare/reviewRound';

const route = [
  {
    path: '/manage/temperature',
    name: 'temperature',
    component: temperature,
  },
  {
    path: '/manage/bloodPressure',
    name: 'bloodPressure',
    component: bloodPressure,
  },
  {
    path: '/manage/bloodSugar',
    name: 'bloodSugar',
    component: bloodSugar,
  },
  {
    path: '/manage/bloodO2',
    name: 'bloodO2',
    component: bloodO2,
  },
  {
    path: '/manage/pulse',
    name: 'pulse',
    component: pulse,
  },
  {
    path: '/manage/heartElectric',
    name: 'heartElectric',
    component: heartElectric,
  },
  {
    path: '/manage/heightAndWeight',
    name: 'heightAndWeight',
    component: heightAndWeight,
  },
  {
    path: '/manage/routineUrineTest',
    name: 'routineUrineTest',
    component: routineUrineTest,
  },
  {
    path: '/manage/routineBloodTest',
    name: 'routineBloodTest',
    component: routineBloodTest,
  },
  {
    path: '/position',
    name: 'position',
    component: position,
  },
  {
    path: '/reviewRound',
    name: 'reviewRound',
    component: reviewRound,
  },
];
export default route;
