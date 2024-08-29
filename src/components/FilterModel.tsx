import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import InputComponent from './ui/InputComponent';
import { ChangeEvent, useState } from 'react';
import { Transition } from "@headlessui/react";
import AppleIcon from '@mui/icons-material/Apple';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterSlice } from '../App/features';
import { RootState } from '../App/Store';
type Anchor = 'right';
interface IResearch{
  Name: string;
  Category: string;
  Brand: string;
  MinPrice: number;
  MaxPrice: number;
  MinDiscount: number;
  MaxDiscount: number;
  MinRate: number;
  MaxRate: number;
}
export default function FilterModel() {
  const [state, setState] = useState({
    right: false,
  });

  const [research,setResearch] = useState<IResearch>({
    Name: '',
    Category: '',
    Brand: '',
    MinPrice: 0,
    MaxPrice: 0,
    MinDiscount: 0,
    MaxDiscount: 0,
    MinRate: 0,
    MaxRate: 0,
  })
  const dispatch = useDispatch()
  dispatch(setFilterSlice(research))
  const [isOpen, setIsOpen] = useState(false);
  const filterState = useSelector((state: RootState) => state.filterSlice);
  console.log(filterState)
  const options = [
    { value: 'apple', label: 'Apple', icon: <AppleIcon className="w-5 h-5 text-gray-500" /> },
    { value: 'samsung', label: 'Samsung', icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-6 h-6" viewBox="0 0 48 48">
      <path fill="#0d47a1" d="M47.97,19.826c0.654,3.747-9.547,8.655-22.788,10.96c-13.238,2.306-24.5,1.136-25.153-2.613 c-0.653-3.747,9.551-8.654,22.79-10.958C36.059,14.907,47.318,16.078,47.97,19.826z"></path><polygon fill="#fafafa" points="35.51,25.388 35.442,21.492 36.671,21.492 36.671,26.403 34.905,26.403 33.678,22.373 33.652,22.373 33.72,26.403 32.499,26.403 32.499,21.492 34.342,21.492 35.483,25.388"></polygon><polygon fill="#fafafa" points="13.177,21.952 12.497,26.455 11.157,26.455 12.076,21.492 14.284,21.492 15.201,26.455 13.865,26.455 13.204,21.952"></polygon><polygon fill="#fafafa" points="18.964,25.286 19.577,21.492 21.601,21.492 21.708,26.455 20.468,26.455 20.435,21.993 20.409,21.993 19.58,26.455 18.321,26.455 17.49,21.993 17.464,21.993 17.433,26.455 16.19,26.455 16.3,21.492 18.325,21.492 18.937,25.286"></polygon><path fill="#fafafa" d="M9.067,25.055c0.049,0.12,0.034,0.275,0.011,0.368c-0.042,0.165-0.154,0.333-0.483,0.333 c-0.312,0-0.5-0.179-0.5-0.45v-0.48H6.763L6.762,25.21c0,1.106,0.871,1.441,1.805,1.441c0.898,0,1.637-0.307,1.754-1.134 c0.061-0.429,0.015-0.709-0.005-0.816c-0.209-1.039-2.093-1.349-2.233-1.93c-0.024-0.099-0.017-0.205-0.005-0.262 c0.035-0.158,0.143-0.332,0.453-0.332c0.29,0,0.461,0.18,0.461,0.45c0,0.091,0,0.307,0,0.307h1.237v-0.348 c0-1.081-0.97-1.25-1.673-1.25c-0.883,0-1.604,0.292-1.736,1.099c-0.036,0.223-0.041,0.422,0.011,0.671 C7.049,24.118,8.811,24.412,9.067,25.055z"></path><path fill="#fafafa" d="M25.204,25.046c0.049,0.119,0.033,0.27,0.011,0.363c-0.041,0.165-0.152,0.33-0.479,0.33 c-0.307,0-0.494-0.179-0.494-0.444l-0.001-0.476h-1.318l-0.002,0.379c0,1.095,0.863,1.426,1.787,1.426 c0.888,0,1.62-0.303,1.736-1.122c0.061-0.426,0.018-0.702-0.004-0.807c-0.208-1.029-2.073-1.336-2.211-1.912 c-0.024-0.099-0.017-0.203-0.005-0.257c0.036-0.16,0.142-0.329,0.449-0.329c0.288,0,0.455,0.175,0.455,0.444 c0,0.09,0,0.304,0,0.304h1.228v-0.345c0-1.07-0.962-1.237-1.659-1.237c-0.873,0-1.588,0.288-1.717,1.09 c-0.036,0.22-0.04,0.415,0.012,0.663C23.206,24.118,24.951,24.41,25.204,25.046z"></path><path fill="#fafafa" d="M29.372,25.713c0.344,0,0.451-0.238,0.475-0.36c0.01-0.054,0.013-0.125,0.012-0.19V21.49h1.255 v3.56c0.003,0.091-0.006,0.279-0.011,0.325c-0.088,0.927-0.821,1.227-1.732,1.227c-0.913,0-1.646-0.301-1.733-1.227 c-0.004-0.047-0.013-0.235-0.011-0.325v-3.56h1.254v3.672c0,0.064,0.002,0.137,0.012,0.19 C28.921,25.473,29.025,25.713,29.372,25.713z"></path><path fill="#fafafa" d="M39.725,25.66c0.359,0,0.485-0.227,0.508-0.359c0.009-0.057,0.012-0.126,0.011-0.189v-0.72 h-0.509v-0.724h1.76V25c-0.001,0.093-0.003,0.162-0.018,0.327c-0.082,0.903-0.866,1.225-1.745,1.225 c-0.881,0-1.663-0.322-1.747-1.225c-0.014-0.166-0.016-0.234-0.018-0.327l0.001-2.089c0-0.088,0.011-0.244,0.021-0.327 c0.11-0.928,0.862-1.226,1.743-1.226c0.88,0,1.651,0.297,1.742,1.226c0.016,0.158,0.011,0.327,0.011,0.327v0.166h-1.251v-0.278 c0.001,0.001-0.002-0.118-0.016-0.189c-0.021-0.11-0.116-0.362-0.495-0.362c-0.362,0-0.467,0.238-0.494,0.362 c-0.015,0.065-0.021,0.154-0.021,0.234v2.27c-0.001,0.063,0.003,0.132,0.013,0.189C39.241,25.433,39.366,25.66,39.725,25.66z"></path>
      </svg> },
    { value: 'huawei', label: 'Huawei', icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-6 h-6" viewBox="0 0 32 32">
      <path d="M 13 4 C 10.97 4 9.4052969 5.7677656 9.4042969 9.0097656 C 9.4042969 11.126766 12.608219 16.5575 15.449219 21.3125 C 15.449219 9.0005 15.146 7.667 13 4 z M 19 4 C 16.812 7.604 16.550781 8.9995 16.550781 21.3125 C 19.391781 16.5575 22.595703 11.126766 22.595703 9.0097656 C 22.594703 5.7667656 21.03 4 19 4 z M 6 8 C 3.021 10.079 4.0009062 15.000422 5.5039062 16.607422 C 6.4969063 17.647422 10.35 19.52 14 22 L 6 8 z M 26 8 L 18 22 C 21.65 19.52 25.503094 17.647422 26.496094 16.607422 C 27.999094 15.000422 28.979 10.079 26 8 z M 2 16 C 2.048 21.542 5.4307969 23 7.7167969 23 L 13.431641 23 L 2 16 z M 30 16 L 18.568359 23 L 24.283203 23 C 26.569203 23 29.952 21.542 30 16 z M 5.1171875 24 C 5.4361875 25.654 6.1573281 27 8.2363281 27 C 10.315328 27 12.325641 25.8 13.431641 24 L 5.1171875 24 z M 18.568359 24 C 19.674359 25.8 21.684672 27 23.763672 27 C 25.842672 27 26.563813 25.654 26.882812 24 L 18.568359 24 z"></path>
  </svg> },
    { value: 'xiaomi', label: 'Xiaomi', icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-6 h-6" viewBox="0 0 50 50">
      <path d="M 11 4 C 7.145 4 4 7.145 4 11 L 4 39 C 4 42.855 7.145 46 11 46 L 39 46 C 42.855 46 46 42.855 46 39 L 46 11 C 46 7.145 42.855 4 39 4 L 11 4 z M 11 6 L 39 6 C 41.773 6 44 8.227 44 11 L 44 39 C 44 41.773 41.773 44 39 44 L 11 44 C 8.227 44 6 41.773 6 39 L 6 11 C 6 8.227 8.227 6 11 6 z M 11 15 C 10.448 15 10 15.447 10 16 L 10 34 C 10 34.553 10.448 35 11 35 L 15 35 C 15.552 35 16 34.553 16 34 L 16 21 L 24 21 C 25.103 21 26 21.897 26 23 L 26 34 C 26 34.553 26.447 35 27 35 L 31 35 C 31.553 35 32 34.553 32 34 L 32 22 C 32 18.141 28.859 15 25 15 L 11 15 z M 35 15 C 34.447 15 34 15.447 34 16 L 34 34 C 34 34.553 34.447 35 35 35 L 39 35 C 39.553 35 40 34.553 40 34 L 40 16 C 40 15.447 39.553 15 39 15 L 35 15 z M 12 17 L 25 17 C 27.757 17 30 19.243 30 22 L 30 33 L 28 33 L 28 23 C 28 20.794 26.206 19 24 19 L 15 19 C 14.448 19 14 19.447 14 20 L 14 33 L 12 33 L 12 17 z M 36 17 L 38 17 L 38 33 L 36 33 L 36 17 z M 19 22 C 18.448 22 18 22.447 18 23 L 18 34 C 18 34.553 18.448 35 19 35 L 23 35 C 23.552 35 24 34.553 24 34 L 24 23 C 24 22.447 23.552 22 23 22 L 19 22 z M 20 24 L 22 24 L 22 33 L 20 33 L 20 24 z"></path>
      </svg> },
    { value: 'lenovo', label: 'Lenovo', icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-6 h-6" viewBox="0 0 48 48">
      <rect width="48" height="16" y="16" fill="#ff1744"></rect><path fill="#fff" d="M11.935,26.062c0.37,0.341,0.782,0.45,1.227,0.478c0.645,0.039,1.217-0.156,1.724-0.546 c0.124-0.096,0.163-0.126,0.163-0.126s0.777,0.609,1.097,0.855c-0.261,0.309-0.567,0.521-0.901,0.692 c-1.103,0.565-2.249,0.687-3.424,0.264c-1.346-0.485-2.131-1.693-2.059-3.117c0.073-1.441,1.005-2.608,2.392-2.944 c1.064-0.257,2.084-0.143,2.98,0.539c0.651,0.496,1.001,1.28,1.147,2.068c0,0-2.595,1.11-3.795,1.606 C12.313,25.903,12.141,25.975,11.935,26.062z M11.472,24.928c0.969-0.401,1.935-0.801,2.901-1.201 c-0.334-0.722-1.096-1.017-1.866-0.748C11.758,23.24,11.28,24.124,11.472,24.928z"></path><path fill="#fff" d="M27.076,27.934c-1.632-0.017-2.956-1.068-3.261-2.6c-0.37-1.852,0.969-3.633,2.86-3.808 c1.281-0.118,2.373,0.254,3.155,1.3c1.451,1.941,0.22,4.757-2.193,5.055C27.45,27.905,27.263,27.917,27.076,27.934z M27.11,26.434 c0.929,0.002,1.622-0.723,1.628-1.704c0.006-0.97-0.724-1.742-1.649-1.745c-0.936-0.003-1.631,0.734-1.628,1.726 C25.465,25.675,26.189,26.432,27.11,26.434z"></path><path fill="#fff" d="M40.624,27.934c-1.632-0.017-2.956-1.068-3.261-2.6c-0.37-1.852,0.969-3.633,2.86-3.808 c1.281-0.118,2.373,0.254,3.155,1.3c1.451,1.941,0.22,4.757-2.193,5.055C40.998,27.905,40.811,27.917,40.624,27.934z M40.658,26.434c0.929,0.002,1.623-0.723,1.628-1.704c0.006-0.97-0.724-1.742-1.649-1.745c-0.936-0.003-1.631,0.734-1.628,1.726 C39.013,25.675,39.737,26.432,40.658,26.434z"></path><path fill="#fff" d="M21.377,27.987c0-0.095,0.001-2.587,0-3.663c-0.001-0.759-0.605-1.327-1.414-1.331 c-0.794-0.005-1.383,0.56-1.384,1.332c-0.001,1.076,0,3.679,0,3.679l-1.741,0.002l0.007-6.378c0,0,1.168-0.018,1.722-0.018 c0,0.264-0.006,0.832-0.006,0.832s0.138-0.128,0.181-0.171c1.157-1.174,3.226-0.973,4.031,0.391 c0.223,0.378,0.338,0.789,0.34,1.223c0.008,1.264,0.003,4.104,0.003,4.104S21.964,27.987,21.377,27.987z"></path><path fill="#fff" d="M30.164,21.608c0.642,0,1.964,0.015,1.964,0.015s1.478,4.024,1.526,4.149 c0.115-0.311,1.208-3.29,1.521-4.174c0.646,0.018,1.288,0.01,1.97,0.01c-0.029,0.084-2.562,6.398-2.562,6.398l-1.876-0.003 C31.905,26.042,30.191,21.692,30.164,21.608z"></path><path fill="#fff" d="M5.767,26.393c0.104,0,3.868,0.011,3.868,0.011l-0.002,1.581L4,27.989v-8.073h1.77 C5.77,19.916,5.767,26.284,5.767,26.393z"></path>
      </svg> },
    { value: 'dell', label: 'Dell', icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-6 h-6" viewBox="0 0 50 50">
      <path d="M 25 2 C 12.308594 2 2 12.308594 2 25 C 2 37.691406 12.308594 48 25 48 C 37.691406 48 48 37.691406 48 25 C 48 12.308594 37.691406 2 25 2 Z M 25 4 C 36.609375 4 46 13.390625 46 25 C 46 36.609375 36.609375 46 25 46 C 13.390625 46 4 36.609375 4 25 C 4 13.390625 13.390625 4 25 4 Z M 22.28125 19.125 L 17.3125 23.03125 C 16.710938 21.519531 15.105469 20.09375 12.875 20.09375 L 8.625 20.09375 L 8.625 29.5625 L 12.875 29.5625 C 14.875 29.5625 16.597656 28.347656 17.3125 26.625 L 22.28125 30.53125 L 27.71875 26.28125 L 27.71875 29.5625 L 34.3125 29.5625 L 34.3125 26.78125 L 31 26.78125 L 31 20.09375 L 27.71875 20.09375 L 27.71875 23.375 L 23.15625 26.96875 L 22.28125 26.28125 L 26.84375 22.6875 L 25 21.25 L 20.4375 24.8125 L 19.5625 24.125 L 24.125 20.5625 Z M 35.1875 20.09375 L 35.1875 29.5625 L 41.78125 29.5625 L 41.78125 26.78125 L 38.46875 26.78125 L 38.46875 20.09375 Z M 11.8125 22.8125 L 12.53125 22.8125 C 13.730469 22.8125 14.59375 23.527344 14.59375 24.8125 C 14.59375 26.214844 13.648438 26.84375 12.53125 26.84375 L 11.8125 26.84375 Z"></path>
      </svg> },
    { value: 'hp', label: 'HP', icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-6 h-6" viewBox="0 0 50 50">
      <path d="M 25.205078 2.0078125 L 20.150391 16 L 23.394531 16 C 25.514531 16 26.657641 17.631953 25.931641 19.626953 L 20.492188 34.001953 L 16.574219 34 L 22.150391 19 L 18.964844 19 L 13.388672 34 L 9.1503906 34 L 20.798828 2.3945312 C 20.327828 2.4815313 19.860391 2.5793125 19.400391 2.6953125 C 9.4163906 5.2023125 2.0019531 14.250953 2.0019531 25.001953 C 2.0019531 35.382953 8.9149062 44.174391 18.378906 47.025391 C 18.699906 47.122391 19.024562 47.215828 19.351562 47.298828 L 20.042969 45.386719 L 24.068359 34.257812 L 24.070312 34.257812 L 30.589844 16 L 38.392578 16 C 40.514578 16 41.656641 17.631953 40.931641 19.626953 L 36.183594 32.314453 C 35.845594 33.241453 34.762391 34 33.775391 34 L 28.150391 34 L 23.826172 45.941406 L 23.111328 47.917969 C 23.403328 47.941969 23.695234 47.964562 23.990234 47.976562 C 24.326234 47.991563 24.662953 48.001953 25.001953 48.001953 C 37.683953 48.001953 48.001953 37.684953 48.001953 25.001953 C 48.000953 12.609953 38.148187 2.4814375 25.867188 2.0234375 C 25.647188 2.0154375 25.426078 2.0098125 25.205078 2.0078125 z M 33.964844 19 L 29.455078 31 L 32.640625 31 L 37.150391 19 L 33.964844 19 z"></path>
  </svg> },
    { value: 'asus', label: 'Asus', icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-6 h-6" viewBox="0 0 64 64">
      <linearGradient id="2Y1XxsPegNiOuMSKFWPuea_It75JPo3qKDs_gr1" x1="45.724" x2="45.405" y1="22.004" y2="34.706" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#6dc7ff"></stop><stop offset=".699" stop-color="#e6abff"></stop></linearGradient><rect width="3.573" height="3.953" x="43.837" y="24.036" fill="url(#2Y1XxsPegNiOuMSKFWPuea_It75JPo3qKDs_gr1)"></rect><linearGradient id="2Y1XxsPegNiOuMSKFWPueb_It75JPo3qKDs_gr2" x1="32.45" x2="32.131" y1="21.671" y2="34.373" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#6dc7ff"></stop><stop offset=".699" stop-color="#e6abff"></stop></linearGradient><path fill="url(#2Y1XxsPegNiOuMSKFWPueb_It75JPo3qKDs_gr2)" d="M32.13,34.78v-0.87 C32.14,34.08,32.15,34.39,32.13,34.78z"></path><linearGradient id="2Y1XxsPegNiOuMSKFWPuec_It75JPo3qKDs_gr3" x1="22.387" x2="22.067" y1="21.418" y2="34.12" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#6dc7ff"></stop><stop offset=".699" stop-color="#e6abff"></stop></linearGradient><path fill="url(#2Y1XxsPegNiOuMSKFWPuec_It75JPo3qKDs_gr3)" d="M32.13,33.91v0.87 c-0.01,0.18-0.03,0.38-0.07,0.58c0,0-0.3,2.94-3.22,3.59H12.12V28.88l3.47,0.28v5.9c0,0,11.71,0,12.52,0 c0.66,0,0.73-0.67,0.73-0.76c0.01-0.76-0.51-0.84-0.79-0.85c0,0-8.63-0.8-8.94-0.83c0,0-1.28-0.25-2.09-1.11 c-0.34-0.37-0.87-1.02-1.09-2.32c0,0,11.6,1.03,12.91,1.16c2.18,0.23,3.19,2.83,3.28,3.42C32.12,33.77,32.12,33.82,32.13,33.91z"></path><linearGradient id="2Y1XxsPegNiOuMSKFWPued_It75JPo3qKDs_gr4" x1="19.052" x2="18.733" y1="21.334" y2="34.036" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#6dc7ff"></stop><stop offset=".699" stop-color="#e6abff"></stop></linearGradient><path fill="url(#2Y1XxsPegNiOuMSKFWPued_It75JPo3qKDs_gr4)" d="M31.47,24.02v3.97H6.3 c0,0,1.46-2.66,1.82-3.19c0.34-0.53,0.8-0.76,1.28-0.76c0.47,0,6.35,0,6.35,0v3.63c0,0,0.32-1.39,0.89-2.05 c0.53-0.63,1.24-1.49,2.87-1.6H31.47z"></path><linearGradient id="2Y1XxsPegNiOuMSKFWPuee_It75JPo3qKDs_gr5" x1="5.393" x2="5.073" y1="20.991" y2="33.693" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#6dc7ff"></stop><stop offset=".699" stop-color="#e6abff"></stop></linearGradient><polygon fill="url(#2Y1XxsPegNiOuMSKFWPuee_It75JPo3qKDs_gr5)" points="6.16,28.23 10.13,28.7 4.21,38.95 0.01,38.95"></polygon><linearGradient id="2Y1XxsPegNiOuMSKFWPuef_It75JPo3qKDs_gr6" x1="33.993" x2="33.674" y1="21.709" y2="34.411" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#6dc7ff"></stop><stop offset=".699" stop-color="#e6abff"></stop></linearGradient><rect width="3.57" height="3.95" x="32.1" y="24.04" fill="url(#2Y1XxsPegNiOuMSKFWPuef_It75JPo3qKDs_gr6)"></rect><linearGradient id="2Y1XxsPegNiOuMSKFWPueg_It75JPo3qKDs_gr7" x1="40.016" x2="39.696" y1="21.86" y2="34.563" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#6dc7ff"></stop><stop offset=".699" stop-color="#e6abff"></stop></linearGradient><path fill="url(#2Y1XxsPegNiOuMSKFWPueg_It75JPo3qKDs_gr7)" d="M47.41,29.42c0,0,0,1.78,0,5.5 c0,3.73-3.49,4.05-3.49,4.05h-8.16c-0.04-0.01-0.32-0.03-0.32-0.03s-2.74-0.26-3.31-3.63v-0.53c0.02-0.39,0.01-0.7,0-0.87v-5.64 l3.55,0.29c0,0,0,4.01,0,5.22c0,1.22,1.02,1.31,1.02,1.31s4.9,0,6.04,0c1.15,0,1.16-1.32,1.16-1.32v-4.59L47.41,29.42z"></path><linearGradient id="2Y1XxsPegNiOuMSKFWPueh_It75JPo3qKDs_gr8" x1="32.45" x2="32.131" y1="21.671" y2="34.373" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#6dc7ff"></stop><stop offset=".699" stop-color="#e6abff"></stop></linearGradient><path fill="url(#2Y1XxsPegNiOuMSKFWPueh_It75JPo3qKDs_gr8)" d="M32.13,34.78v-0.87 C32.14,34.08,32.15,34.39,32.13,34.78z"></path><linearGradient id="2Y1XxsPegNiOuMSKFWPuei_It75JPo3qKDs_gr9" x1="55.855" x2="55.536" y1="22.259" y2="34.961" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#6dc7ff"></stop><stop offset=".699" stop-color="#e6abff"></stop></linearGradient><path fill="url(#2Y1XxsPegNiOuMSKFWPuei_It75JPo3qKDs_gr9)" d="M63.99,24.02v3.97H47.44v-0.32 c0,0,0.32-1.39,0.88-2.05c0.54-0.63,1.25-1.49,2.88-1.6H63.99z"></path><linearGradient id="2Y1XxsPegNiOuMSKFWPuej_It75JPo3qKDs_gr10" x1="56.013" x2="55.693" y1="22.262" y2="34.965" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#6dc7ff"></stop><stop offset=".699" stop-color="#e6abff"></stop></linearGradient><path fill="url(#2Y1XxsPegNiOuMSKFWPuej_It75JPo3qKDs_gr10)" d="M63.92,33.77c0,0,0.09,0.73-0.02,1.62 c0,0-0.46,3.39-3.67,3.59H47.44v-3.94c0,0,11.62,0,12.43,0c0.29,0,0.59-0.19,0.59-0.19c0.13-0.13,0.24-0.37,0.24-0.6 c0-0.75-0.56-0.79-0.84-0.8c0,0-8.73-0.82-9.04-0.84c0,0-1.21-0.21-2.02-1.07c-0.35-0.37-0.81-0.78-1.16-2.11 c0,0,11.67,0.76,12.97,0.9C62.8,30.56,63.82,32.97,63.92,33.77z"></path><g><linearGradient id="2Y1XxsPegNiOuMSKFWPuek_It75JPo3qKDs_gr11" x1="53.919" x2="53.919" y1="11.553" y2="45.092" gradientUnits="userSpaceOnUse"><stop offset=".272" stop-color="#1a6dff"></stop><stop offset=".695" stop-color="#c822ff"></stop></linearGradient><path fill="url(#2Y1XxsPegNiOuMSKFWPuek_It75JPo3qKDs_gr11)" d="M51.197,23.517l-0.033,0.001 c-1.812,0.122-2.647,1.107-3.214,1.775c-0.012,0.014-0.023,0.032-0.035,0.047v-1.81h-4.578v4.959h3.605h0.973H64.5v-4.973H51.197z M46.915,27.49h-2.578v-2.959h2.578V27.49z M63.5,27.49H48.003c0.13-0.455,0.385-1.178,0.723-1.565 c0.495-0.583,1.111-1.309,2.489-1.407H63.5V27.49z"></path><linearGradient id="2Y1XxsPegNiOuMSKFWPuel_It75JPo3qKDs_gr12" x1="31.795" x2="31.795" y1="11.553" y2="45.092" gradientUnits="userSpaceOnUse"><stop offset=".294" stop-color="#1a6dff"></stop><stop offset=".797" stop-color="#c822ff"></stop></linearGradient><path fill="url(#2Y1XxsPegNiOuMSKFWPuel_It75JPo3qKDs_gr12)" d="M60.665,29.833L60.665,29.833 c-1.301-0.136-12.51-0.869-12.986-0.9l-0.687-0.045l0,0.001l-3.601-0.236v5.117c-0.003,0.194-0.06,0.821-0.657,0.821l-5.974,0.003 c-0.138-0.018-0.587-0.127-0.587-0.809V28.1l-0.002,0v-4.563H31.97v-0.019l-12.492,0.001c-1.814,0.121-2.643,1.1-3.214,1.775 c-0.008,0.008-0.015,0.017-0.022,0.025v-1.775h-6.84c-0.485,0-1.174,0.172-1.687,0.973c-0.374,0.526-1.703,2.958-1.854,3.233 l-0.067,0.123l-6.658,11.569h5.371l6.312-10.953h0.803v10.953h17.276l0.053-0.012c1.692-0.372,2.653-1.492,3.153-2.536 c1.068,2.297,3.268,2.544,3.313,2.547c0.003,0,0.188,0.009,0.23,0.014l0.121,0.015l8.194-0.002 c0.829-0.075,2.103-0.514,2.979-1.584v1.599h0.5l12.82-0.001c2.864-0.182,3.95-2.713,4.123-4.023 c0.131-0.954,0.032-1.72,0.028-1.745C64.308,32.809,63.178,30.098,60.665,29.833z M48.346,31.785l0.092,0.098 c0.908,0.969,2.239,1.203,2.335,1.218c0.312,0.027,9.031,0.843,9.054,0.844c0.341,0.017,0.368,0.062,0.368,0.304 c0,0.081-0.027,0.157-0.056,0.205c-0.088,0.042-0.203,0.084-0.274,0.084H47.915v-3.255C48.067,31.491,48.215,31.647,48.346,31.785z M32.596,24.536h2.576v2.953h-2.576V24.536z M17.051,25.911c0.517-0.61,1.102-1.302,2.46-1.394H30.97v2.973H16.306 C16.441,27.032,16.705,26.307,17.051,25.911z M31.636,28.49l0.003,3.111c-0.619-0.845-1.531-1.619-2.758-1.741 c-1.233-0.129-11.506-1.046-12.789-1.16l-0.023-0.002c-0.027-0.002-0.009-0.208-0.009-0.208H31.636z M16.655,31.855 c0.904,0.965,2.308,1.24,2.393,1.256c0.302,0.041,8.076,0.751,8.981,0.833c0.213,0.011,0.314,0.03,0.315,0.341 c-0.009,0.104-0.051,0.279-0.236,0.279H16.092v-3.458C16.308,31.466,16.521,31.705,16.655,31.855z M8.543,25.076 c0.229-0.358,0.511-0.532,0.858-0.532h5.84v2.946H7.146C7.639,26.599,8.317,25.395,8.543,25.076z M3.929,38.442H0.864l5.568-9.673 l2.877,0.336L3.929,38.442z M15.241,28.629 M31.558,35.299c-0.012,0.104-0.307,2.569-2.77,3.144H12.622v-9.025l2.47,0.203v5.944 h13.017c0.934,0,1.235-0.85,1.235-1.262c0-0.81-0.473-1.317-1.243-1.355c-3.456-0.315-8.683-0.796-8.891-0.823 c-0.012-0.002-1.147-0.229-1.816-0.944c-0.199-0.224-0.572-0.642-0.817-1.434c2.515,0.225,11.11,0.993,12.202,1.107l0.002,0 c1.922,0.191,2.793,2.654,2.844,2.953c0.001,0.009,0.012,0.171,0.012,0.427C31.636,34.611,31.611,34.951,31.558,35.299z M46.915,34.929c0,3.212-2.919,3.531-2.997,3.541h-8.133c-0.117-0.013-0.282-0.024-0.294-0.025 c-0.105-0.011-2.367-0.291-2.855-3.135v-6.492l2.538,0.205v4.764c0,1.318,0.973,1.757,1.533,1.806h6.027 c1.216,0,1.657-1.088,1.657-1.819v-4.052l2.523,0.166V34.929z M63.396,35.324c-0.018,0.122-0.443,2.985-3.164,3.159H47.942v-2.946 h11.922c0.404,0,0.786-0.219,0.858-0.263l0.094-0.074c0.233-0.233,0.378-0.598,0.378-0.952c0-0.463-0.172-1.247-1.297-1.301 c0,0-8.725-0.816-8.998-0.838c-0.011-0.001-1.063-0.196-1.73-0.908l-0.099-0.105c-0.235-0.249-0.495-0.522-0.728-1.117 c2.571,0.169,11.125,0.734,12.218,0.848c1.931,0.204,2.79,2.4,2.861,3.011C63.423,33.844,63.507,34.51,63.396,35.324z"></path></g>
      </svg> },
    { value: 'acer', label: 'Acer', icon: <img src="/IMG/acer-svgrepo-com.svg" className="w-5 h-5 text-gray-500" /> },
    { value: 'microsoft', label: 'Microsoft', icon: <MicrosoftIcon className="w-5 h-5 text-gray-500" /> },
  ];
  // handlers
  const handelChange = (event: ChangeEvent<HTMLInputElement>)=>{
    const { value, name } = event.target;
    setResearch({
      ...research,
    [name]: value
    })
  }
  const handleSelect = (value: string) => {
    setResearch({
        ...research,
        Brand: value
    });
    setIsOpen(false);
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ [anchor]: open });
    };

    // const onClose = ()=>{
    //   toggleDrawer("right", false)
    // }

  const list = () => (
    <Box
      sx={{ width: 300}}
      role="presentation">
      <List>
        <div className='p-5 flex justify-between mt-3 mb-3'>
            <h3 className='text-2xl'>Filter</h3>
            <button onClick={toggleDrawer("right", false)}>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 hover:text-red-500 transition-all">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                 </svg>
            </button>
        </div>


        <div className='px-5 space-y-9'>
            <div>
                <InputComponent value={research.Name} onChange={handelChange} name="Name" id="Name" className="custom-input mb-1 w-full p-2 rounded-md"
                placeholder="Max Price"/>
            </div>
            
            <div className="relative w-full max-w-xs mx-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      >
        {research.Brand ? options.find(option => option.value === research.Brand)?.label : 'select brand'}
        <svg
          className={`w-5 h-5 transition-transform transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map(option => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="flex items-center px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
            >
              <span className="mr-2">{option.icon}</span>
              {option.label}
            </div>
          ))}
        </div>
      </Transition>
            </div>

            <div>
  
                <InputComponent value={research.Category} onChange={handelChange} name="Category" id="Category" className="custom-input mb-1 w-full p-2 rounded-md"
                placeholder="Category"/>
            </div>
            <div>
                
                <InputComponent type='number' value={research.MinPrice} onChange={handelChange} name="MinPrice" id="MinPrice" className="custom-input mb-1 w-full p-2 rounded-md"
                placeholder="Min Price"/>
            </div>

            <div>
                <InputComponent type='number' value={research.MaxPrice} onChange={handelChange} name="MaxPrice" id="MaxPrice" className="custom-input mb-1 w-full p-2 rounded-md"
                placeholder="Max Price"/>
           </div>
           <div>
                <InputComponent type='number' onChange={handelChange} value={research.MinDiscount} name="MinDiscount" id="MinDiscount" className="custom-input mb-1 w-full p-2 rounded-md"
                 placeholder="Min Discount"/>
           </div>
           <div>
                <InputComponent type='number' onChange={handelChange} value={research.MaxDiscount} name="MaxDiscount" id="MaxDiscount" className="custom-input mb-1 w-full p-2 rounded-md"
                 placeholder="Max Discount"/>
           </div>

           <div>
                <InputComponent type='number' onChange={handelChange} value={research.MinRate} name="MinRate" id="MinRate" className="custom-input mb-1 w-full p-2 rounded-md"
                placeholder="Min Rate"/>
           </div>
            
           <div>
                <InputComponent type='number' onChange={handelChange} value={research.MaxRate} name="MaxRate" id="MaxRate" className="custom-input mb-1 w-full p-2 rounded-md"
                placeholder="Max Rate"/>
           </div>

           <button  className='w-full text-lg bg-blue-500 text-white py-2 rounded-md hover:bg-white hover:text-blue-500 hover:border transition-all'>search</button>
        </div>
      </List>
    </Box>
  );

  return (
    <div>
      {(['right'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <button className='py-2 px-5 rounded-md border text-blue-500 text-xl' onClick={toggleDrawer(anchor, true)}>Filter</button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list()}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
