import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: "category",
    title: "Category",
    subtitle: "Create category and update",
    type: 'item',
    icon: 'heroicons-outline:briefcase',
    translate: 'Category',
    url: 'category',
    auth: "admin"
  },
  {
    id: "brand",
    title: "Brand",
    subtitle: "Brand create and update",
    type: 'item',
    icon: 'material-twotone:branding_watermark',
    translate: 'Brand',
    url: 'brand',
    auth: "admin"
  },
  {
    id: 'example-component',
    title: 'Example',
    translate: 'EXAMPLE',
    type: 'item',
    icon: 'heroicons-outline:star',
    url: 'example',
    auth: "admin"
  },
  {
    id: 'size',
    title: 'Size',
    translate: 'Size',
    type: 'item',
    icon: 'heroicons-outline:star',
    url: 'size',
    auth: "admin"
  },
  // {
  //   id: 'Book',
  //   title: 'Book',
  //   translate: 'Book',
  //   type: 'item',
  //   icon: 'heroicons-outline:book-open',
  //   url: 'book',
  //   auth: "admin"
  // },
  {
    id: 'tasks',
    title: 'Prodacts',
    subtitle: 'all products',
    type: 'item',
    icon: 'heroicons-outline:check-circle',
    url: 'tasks',
    translate: 'Prodacts',
  }
];

export default navigationConfig;
