import uuidv5 from 'uuid';

const PARAMS_DEFAULT = {
  game_style: {
    popup_bg: {
      bg_image: 'url',
      bg_overlay: '#4292E2',
    },
    color_scheme: {
      bg_window: '#fff',
      bg_wheel: '#80BFFF',
      bg_indicator_button: '#FF6262',
      text_content: '#303F5E',
      text_wheel: '#fff',
      text_button: '#fff',
    },
    icon: 'base64',
  },
  content: {
    start: {
      title: 'Get your Christmas present!',
      subtitle: 'One of our awesome gifts already yours! One step more to receive it.',
      button: 'Start',
      form: [
        {
          type: 'email',
          name: 'email',
          checked: true,
          placeholder: 'Email',
        },
        {
          type: 'text',
          name: 'name',
          checked: true,
          placeholder: 'Full Name',
        },
        {
          type: 'text',
          name: 'phone',
          checked: false,
          placeholder: 'Phone Number',
        },
      ],
    },
    progress: {
      title: 'Almost there...',
      subtitle: 'Please...',
    },
    finish: {
      title: 'Congratulations',
      subtitle: '....',
      company_logo: 'base64',
      privacy: 'tra ta ta',
    },
  },
  behavior: {
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
    general_settings: {
      display_game: [
        {
          name: 'scroll',
          title: 'Scroll....',
          checked: true,
          value: 50,
        },
        {
          name: 'onEnter',
          title: 'on enter....',
          checked: false,
          value: null,
        },
        {
          name: 'time',
          title: 'time....',
          checked: false,
          value: 3000,
        },
      ],
      show_on_leaving: true,
      where_game_show: ['todo-list.ho.ua/about'],
      trigger_button: true,
      email_repeat: true,
      show_count: 10,
      show_after_hit: {
        checked: true,
        value: ['5', 'days'],
      },
      send_on_email: 'true',
      exp_copied: 'timestamp',
    },
    trigger_button: {
      bg_color: '#fff',
      text_color: '#000',
      icon: 'gift',
    },
  },
};

export default PARAMS_DEFAULT;
