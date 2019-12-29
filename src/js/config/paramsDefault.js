import uuidv5 from 'uuid';

const PARAMS_DEFAULT = {
  game_style: {
    popup_bg: {
      bg_image: 'https://i.imgur.com/oFRZe7o.png',
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
    icon:
      "data:image/svg+xml,%3Csvg width='41px' height='40px' viewBox='0 0 41 40' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3C!-- Generator: sketchtool 60.1 (101010) - https://sketch.com --%3E%3Ctitle%3EF44CF458-9BEC-496C-8E39-4D3229564C5C%3C/title%3E%3Cdesc%3ECreated with sketchtool.%3C/desc%3E%3Cg id='Asset-Artboard-Page' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='popup-primary-icon-icons-secondary/present-icon' transform='translate(0.599998, 0.000000)' fill-rule='nonzero'%3E%3Cg id='gift-box' transform='translate(0.000000, 1.250000)'%3E%3Cpath d='M18.2194535,6.6201563 C17.9876566,6.32664068 12.4932033,-0.56054688 8.15570316,0.0379687503 C6.61773436,0.250312502 5.43328119,1.33125001 4.63539054,3.25070315 C3.53460925,5.89875005 3.44312487,8.05125006 4.36351553,9.64828133 C5.50937494,11.6365626 7.78062502,11.9573438 7.87671877,11.9700782 C7.9021094,11.9734376 7.9277344,11.9750782 7.9533594,11.9750782 L17.7595316,11.9750782 C18.0831254,11.9750782 18.3454692,11.7127345 18.3454692,11.3891407 L18.3454692,6.98328131 C18.3454692,6.85156256 18.3010941,6.7235938 18.2194535,6.6201563 Z' id='Path' fill='%23FF3D43'%3E%3C/path%3E%3Cpath d='M35.2895318,3.25070325 C34.4916412,1.33125005 33.3072662,0.250312509 31.7692975,0.0379687514 C27.432657,-0.560703146 21.9372664,6.32671899 21.7055477,6.6201565 C21.6239071,6.723594 21.5794539,6.85156276 21.5794539,6.98328151 L21.5794539,11.3891411 C21.5794539,11.7127348 21.8417977,11.9750786 22.1653914,11.9750786 L31.9715631,11.9750786 C31.9971881,11.9750786 32.0228131,11.973438 32.0482037,11.9700786 C32.1442975,11.9573442 34.4155474,11.6365629 35.5614068,9.64828161 C36.4818755,8.05117218 36.3903911,5.89875022 35.2895318,3.25070325 Z' id='Path' fill='%23FF3D43'%3E%3C/path%3E%3Cpath d='M17.7596098,9.27976556 L7.95343766,9.27976556 C7.92781266,9.27976556 7.90218766,9.27812493 7.87679704,9.27476556 C7.78070328,9.26203118 5.50945322,8.94132807 4.36359382,6.95296874 C4.14265631,6.56960938 3.98070318,6.15390626 3.87632818,5.7074219 C3.5851563,7.25828123 3.74687505,8.57820307 4.36359382,9.64828117 C5.50945322,11.6365624 7.78070328,11.9573436 7.87679704,11.970078 C7.90218766,11.9734374 7.92781266,11.975078 7.95343766,11.975078 L17.7596098,11.975078 C18.0832036,11.975078 18.3455473,11.7127342 18.3455473,11.3891405 L18.3455473,8.69382807 C18.3455473,9.01742181 18.0832036,9.27976556 17.7596098,9.27976556 Z' id='Path' fill='%23D62D2D'%3E%3C/path%3E%3Cpath d='M35.5614074,6.95296874 C34.415548,8.94124994 32.144298,9.26203118 32.0482042,9.27476556 C32.0228136,9.27812493 31.9971886,9.27976556 31.9715636,9.27976556 L22.1653915,9.27976556 C21.8417977,9.27976556 21.5794539,9.01742181 21.5794539,8.69382807 L21.5794539,11.3891405 C21.5794539,11.7127342 21.8417977,11.975078 22.1653915,11.975078 L31.9715636,11.975078 C31.9971886,11.975078 32.0228136,11.9734374 32.0482042,11.970078 C32.144298,11.9573436 34.415548,11.6365624 35.5614074,9.64828117 C36.1781262,8.57812495 36.339845,7.25828123 36.0486731,5.7074219 C35.9443762,6.15390626 35.782345,6.56960938 35.5614074,6.95296874 Z' id='Path' fill='%23D62D2D'%3E%3C/path%3E%3Cpath d='M22.1653909,6.39734387 L17.7595317,6.39734387 C17.435938,6.39734387 17.1735942,6.65968761 17.1735942,6.98328135 L17.1735942,11.3891405 C17.1735942,11.7127342 17.435938,11.975078 17.7595317,11.975078 L22.1653909,11.975078 C22.4889846,11.975078 22.7513283,11.7127342 22.7513283,11.3891405 L22.7513283,6.98328135 C22.7513283,6.65968761 22.4889846,6.39734387 22.1653909,6.39734387 Z' id='Path' fill='%23D62D2D'%3E%3C/path%3E%3Cpath d='M36.378907,16.5910935 L3.54609372,16.5910935 C3.22249996,16.5910935 2.9601562,16.8534373 2.9601562,17.1770311 L2.9601562,34.2526568 C2.9601562,35.6567193 4.10242185,36.798985 5.50648438,36.798985 L34.4185163,36.798985 C35.8225788,36.798985 36.9648445,35.6567193 36.9648445,34.2526568 L36.9648445,17.1770311 C36.9648445,16.8533592 36.7025007,16.5910935 36.378907,16.5910935 Z' id='Path' fill='%23FFD039'%3E%3C/path%3E%3Cpath d='M39.3390632,10.8032036 L0.58593751,10.8032036 C0.262343754,10.8032036 0,11.0655473 0,11.3891411 L0,17.1769536 C0,17.5005473 0.262343754,17.7628911 0.58593751,17.7628911 L39.3390632,17.7628911 C39.6626569,17.7628911 39.9250007,17.5005473 39.9250007,17.1769536 L39.9250007,11.3891411 C39.9250007,11.0655473 39.6626569,10.8032036 39.3390632,10.8032036 Z' id='Path' fill='%23FFDF65'%3E%3C/path%3E%3Cpath d='M22.8596097,10.8032036 L17.0653129,10.8032036 C16.7417191,10.8032036 16.4793754,11.0655473 16.4793754,11.3891411 L16.4793754,36.2129688 C16.4793754,36.5365626 16.7417191,36.7989063 17.0653129,36.7989063 L22.8596097,36.7989063 C23.1832035,36.7989063 23.4455472,36.5365626 23.4455472,36.2129688 L23.4455472,11.3891411 C23.4455472,11.0655473 23.1832816,10.8032036 22.8596097,10.8032036 Z' id='Path' fill='%23FF3D43'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
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
          checked: true,
          placeholder: 'Phone Number',
        },
      ],
    },
    progress: {
      title: 'Almost there! And your got',
      subtitle: 'Please wait few second',
    },
    finish: {
      title: 'Congratulations!',
      subtitle: 'You got an awesome gift from us',
      privacy: 'In order to use this discount add it to the relevant field in checkout',
      company_logo:
        'http://157.230.112.210:3003/assets/images/9fddff081fa2158d16a4db5009379b6f.svg',
    },
  },
  behavior: {
    coupons: [
      {
        id: uuidv5(),
        probability: 20,
        chanceReal: 20,
        type: 'string',
        value: '15% Discount',
        win: true,
        resultText: '15OFF',
        userData: {
          score: 0,
        },
      },
      {
        id: uuidv5(),
        probability: 20,
        chanceReal: 20,
        type: 'string',
        value: 'Free Shipping',
        win: true,
        resultText: '20OFF',
        userData: {
          score: 0,
        },
      },
      {
        id: uuidv5(),
        probability: 20,
        chanceReal: 20,
        type: 'string',
        value: '25% Discount Today',
        win: true,
        resultText: '15OFF',
        userData: {
          score: 0,
        },
      },
      {
        id: uuidv5(),
        probability: 20,
        chanceReal: 20,
        type: 'string',
        value: 'No Luck :(',
        win: true,
        resultText: '',
        userData: {
          score: 0,
        },
      },
      {
        id: uuidv5(),
        probability: 20,
        chanceReal: 20,
        type: 'string',
        value: '15% Discount',
        win: true,
        resultText: '10CASH',
        userData: {
          score: 0,
        },
      },
    ],
    // coupons: [
    //   {
    //     id: uuidv5(),
    //     name: '15% Discount',
    //     code: '15OFF',
    //     chance: 20,
    //     chanceReal: 20,
    //   },
    //   {
    //     id: uuidv5(),
    //     name: 'Free Shipping',
    //     code: 'Free787',
    //     chance: 20,
    //     chanceReal: 20,
    //   },
    //   {
    //     id: uuidv5(),
    //     name: '25% Discount Today',
    //     code: '25OFF',
    //     chance: 20,
    //     chanceReal: 20,
    //   },
    //   {
    //     id: uuidv5(),
    //     name: 'No Luck :(',
    //     code: '',
    //     chance: 20,
    //     chanceReal: 20,
    //   },
    //   {
    //     id: uuidv5(),
    //     name: '10$ Cash',
    //     code: '10CASH',
    //     chance: 20,
    //     chanceReal: 20,
    //   },
    // ],
    general_settings: {
      display_game: [
        {
          name: 'onEnter',
          startText: 'On entering the site',
          endText: '',
          checked: true,
          value: '',
        },
        {
          name: 'scroll',
          startText: 'User scrolls',
          endText: '% of the page',
          checked: false,
          value: 50,
        },
        {
          name: 'time',
          startText: 'After',
          endText: 'sec',
          checked: false,
          value: 3000,
        },
      ],
      show_on_leaving: true,
      where_game_show: ['about'],
      trigger_button: true,
      email_repeat: true,
      show_count: 10,
      show_after_hit: {
        checked: true,
        value: ['5', 'days'],
      },
      send_on_email: false,
      exp_copied: '10',
    },
    trigger_button: {
      title: 'Get a gift',
      bg_color: '#fff',
      text_color: '#000',
    },
  },
};

export default PARAMS_DEFAULT;
