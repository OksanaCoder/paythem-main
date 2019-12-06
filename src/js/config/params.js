import { Icon1, Icon2, Icon3 } from 'assets/images/components/widget/widgetIcons';

const PARAMS = {
  family: ['roboto', 'georgia', 'verdana'],
  size: ['10', '20', '42'],
  weight: ['semibold', 'bold', 'light', 'normal'],
  align: ['left', 'center', 'right', 'justify'],
  font_style: ['italic', 'bold_italic'],
  transform: ['lowercase', 'uppercase'],
  widget_icons: [
    {
      name: 'icon1',
      component: Icon1,
    },
    {
      name: 'icon2',
      component: Icon2,
    },
    {
      name: 'icon3',
      component: Icon3,
    },
  ],
};

export default PARAMS;
