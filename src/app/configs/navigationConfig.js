import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'dashboards',
    title: 'Dashboards',
    subtitle: 'Unique dashboard designs',
    type: 'collapse',
    icon: 'heroicons-outline:home',
    translate: 'DASHBOARDS',
    children: [
      {
        id: 'dashboards.project',
        title: 'Project',
        type: 'item',
        icon: 'heroicons-outline:clipboard-check',
        url: '/dashboards/project',
      },
      {
        id: 'dashboards.analytics',
        title: 'Analytics',
        type: 'item',
        icon: 'heroicons-outline:chart-pie',
        url: '/dashboards/analytics',
      },
      {
        id: 'dashboards.finance',
        title: 'Finance',
        type: 'item',
        icon: 'heroicons-outline:cash',
        url: '/dashboards/finance',
      },
    ],
  },
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
    id: 'Book',
    title: 'Book',
    translate: 'Book',
    type: 'item',
    icon: 'heroicons-outline:book-open',
    url: 'book',
    auth: "admin"
  },
  {
    id: 'apps.ecommerce',
    title: 'ECommerce',
    type: 'collapse',
    icon: 'heroicons-outline:shopping-cart',
    translate: 'ECOMMERCE',
    children: [
      {
        id: 'e-commerce-products',
        title: 'Products',
        type: 'item',
        url: 'apps/e-commerce/products',
        end: true,
      },
      {
        id: 'e-commerce-product-detail',
        title: 'Product Detail',
        type: 'item',
        url: 'apps/e-commerce/products/1/a-walk-amongst-friends-canvas-print',
      },
      {
        id: 'e-commerce-new-product',
        title: 'New Product',
        type: 'item',
        url: 'apps/e-commerce/products/new',
      },
      {
        id: 'e-commerce-orders',
        title: 'Orders',
        type: 'item',
        url: 'apps/e-commerce/orders',
        end: true,
      },
      {
        id: 'e-commerce-order-detail',
        title: 'Order Detail',
        type: 'item',
        url: 'apps/e-commerce/orders/1',
      },
    ],
  },
  {
    id: 'pages.invoice',
    title: 'Invoice',
    type: 'collapse',
    icon: 'heroicons-outline:calculator',
    children: [
      {
        id: 'pages.invoice.printable',
        title: 'Printable',
        type: 'collapse',
        children: [
          {
            id: 'pages.invoice.printable.compact',
            title: 'Compact',
            type: 'item',
            url: '/pages/invoice/printable/compact',
          },
          {
            id: 'pages.invoice.printable.modern',
            title: 'Modern',
            type: 'item',
            url: '/pages/invoice/printable/modern',
          },
        ],
      },
    ],
  }
];

export default navigationConfig;
