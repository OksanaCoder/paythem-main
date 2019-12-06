import uuidv5 from 'uuid';

const PARAMS_DEFAULT = {
  game_settings: {
    title: {
      text: 'text 1',
      family: 'roboto',
      size: '42',
      align: 'justify',
      weight: 'bold',
      font_style: 'italic',
      color: '#eb4034',
    },
    sub_title: {
      text: 'text 2',
      family: 'roboto',
      size: '42',
      align: 'justify',
      weight: 'bold',
      font_style: 'italic',
      color: '#eb4034',
    },
    button: {
      text: 'BUTTON',
      color: 'red',
      family: 'roboto',
      size: '42',
      weight: 'bold',
      font_style: 'italic',
    },
    button_bg: {
      color: 'green',
    },
    bg_header: {
      image: {},
      color: '#947a78',
    },
    bg_conent: {
      image: {},
      color: '',
    },
    bg_coupons: ['#000', '#555'],
    input: {
      color: '#000',
    },
    input_border: {
      color: '#000',
    },
    input_text: {
      color: '#000',
    },
  },
  win_settings: {
    title: {
      text: 'text 1',
      family: 'roboto',
      size: '42',
      align: 'justify',
      weight: 'bold',
      font_style: 'italic',
      color: 'blue',
    },

    sub_title: {
      text: 'text 2',
      family: 'roboto',
      size: '42',
      align: 'justify',
      weight: 'bold',
      font_style: 'italic',
      color: '#947a78',
    },
    button: {
      text: 'BUTTON',
      color: 'red',
      family: 'roboto',
      size: '42',
      weight: 'bold',
      font_style: 'italic',
    },
  },
  coupons: [
    {
      id: uuidv5(),
      name: '15% Discount',
      code: '15OFF',
      chance: 20,
    },
    {
      id: uuidv5(),
      name: 'Free Shipping',
      code: 'Free787',
      chance: 20,
    },
    {
      id: uuidv5(),
      name: '25% Discount Today',
      code: '25OFF',
      chance: 20,
    },
    {
      id: uuidv5(),
      name: 'No Luck :(',
      code: '',
      chance: 20,
    },
    {
      id: uuidv5(),
      name: '10$ Cash',
      code: '10CASH',
      chance: 20,
    },
  ],
  edit_widget: {
    title: 'Win a prize',
    icon_name: 'icon1',
    bg: '',
  },
  global_settings: {},
};

export default PARAMS_DEFAULT;
