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
    subtitle: 'all products',
    type: 'item',
    icon: 'heroicons-outline:check-circle',
    url: 'tasks',
    translate: 'Prodacts',
  },
  {
    id: 'tasks',
    title: 'Prodacts',
    subtitle: 'all products',
    type: 'item',
    icon: 'heroicons-outline:check-circle',
    url: 'tasks',
    translate: 'Prodacts',
  },
  {
    id: 'product-image',
    title: 'Product Images',
    subtitle: 'image of product',
    type: 'item',
    icon: 'heroicons-outline:check-circle',
    url: 'product-image',
    translate: 'ProductImages',
  },
  {
    id: 'sales',
    title: 'Sales',
    subtitle: 'sales',
    type: 'item',
    icon: 'heroicons-outline:currency-bangladeshi',
    url: 'sales',
    translate: 'Sales',
  },
  {
    id: 'addproduct',
    title: 'Add Product',
    subtitle: 'Add Product',
    type: 'item',
    icon: 'material-twotone:production_quantity_limits',
    url: 'addproduct',
    translate: 'Add_Product',
  }
];

export default navigationConfig;
