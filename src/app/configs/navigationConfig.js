import i18next from 'i18next';

import uz from './navigation-i18n/uz';
import en from './navigation-i18n/en';
import ru from './navigation-i18n/ru';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('uz', 'navigation', uz);
i18next.addResourceBundle('ru', 'navigation', ru);

const navigationConfig = [
  {
    id: "category",
    title: "Category",
    // subtitle: "Create category and update",
    type: 'item',
    icon: 'heroicons-outline:briefcase',
    translate: 'Category',
    url: 'category',
    auth: "staff"
  },
  {
    id: "brand",
    title: "Brand",
    // subtitle: "Brand create and update",
    type: 'item',
    icon: 'material-twotone:branding_watermark',
    translate: 'Brand',
    url: 'brand',
    auth: "admin"
  },
  {
    id: "advertisement",
    title: "Advertisement",
    type: 'item',
    icon: 'heroicons-outline:badge-check',
    translate: 'Advertisement',
    url: 'advertisement',
    auth: "admin"
  },
  // {
  //   id: 'example-component',
  //   title: 'Example',
  //   translate: 'EXAMPLE',
  //   type: 'item',
  //   icon: 'heroicons-outline:star',
  //   url: 'example',
  //   auth: "admin"
  // },
  {
    id: 'size',
    title: 'Size',
    translate: 'Size',
    type: 'item',
    icon: 'material-twotone:photo_size_select_small',
    url: 'size',
    auth: "admin"
  },
  {
    id: 'color',
    title: 'Color',
    translate: 'Color',
    type: 'item',
    icon: 'heroicons-outline:color-swatch',
    url: 'color',
    auth: "admin"
  },
  {
    id: 'Book',
    title: 'Banner',
    translate: 'Banner',
    type: 'item',
    icon: 'feather:clipboard',
    url: 'book',
    auth: "admin"
  },
  {
    id: 'tasks',
    title: 'Prodacts',
    // subtitle: 'all products',
    type: 'item',
    icon: 'heroicons-outline:check-circle',
    url: 'tasks',
    translate: 'Prodacts',
    auth: "admin"
  },
  {
    id: 'tasks',
    title: 'Prodacts',
    // subtitle: 'all products',
    type: 'item',
    icon: 'heroicons-outline:check-circle',
    url: 'tasks',
    translate: 'Prodacts',
    auth: "admin"
  },
  // {
  //   id: 'product-image',
  //   title: 'Product Images',
  //   subtitle: 'image of product',
  //   type: 'item',
  //   icon: 'heroicons-outline:check-circle',
  //   url: 'product-image',
  //   translate: 'ProductImages',
  // },
  {
    id: 'sales',
    title: 'Sales',
    // subtitle: 'sales',
    type: 'item',
    icon: 'heroicons-outline:currency-bangladeshi',
    url: 'sales',
    translate: 'Sales',
    auth: "staff"
  },
  {
    id: 'addproduct',
    title: 'Add Product',
    // subtitle: 'Add Product',
    type: 'item',
    icon: 'material-twotone:production_quantity_limits',
    url: 'addproduct',
    translate: 'Add_Product',
    auth: "admin"
  },
  {
    id: 'muallif',
    title: 'Muallif',
    // subtitle: 'Muallif',
    type: 'item',
    icon: 'feather:users',
    url: 'muallif',
    translate: 'Muallif',
    auth: "admin"
  },
  {
    id: 'variant',
    title: 'Variant',
    // subtitle: 'Variant',
    type: 'item',
    icon: 'material-twotone:multiple_stop',
    url: 'variant',
    translate: 'Variant',
    auth: "admin"
  },
  {
    id: 'oreder',
    title: 'Oreder',
    // subtitle: 'Oreder',
    type: 'item',
    icon: 'material-twotone:border_color',
    url: 'oreder',
    translate: 'Oreder',
    auth: "staff"
  }
];

export default navigationConfig;
