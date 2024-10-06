export interface Category {
  id: number;
  name: string;
  icon: string;
  numOfJobs?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export const categoryIcons: { [key: string]: string } = {
  'Software Development': 'pi-code',
  'Data Science': 'pi-chart-scatter',
  Marketing: 'pi-megaphone',
  Finance: 'pi-money-bill',
  'Human Resources': 'pi-users',
  Sales: 'pi-shopping-cart',
  'Customer Support': 'pi-headphones',
  Operations: 'pi-spinner-dotted',
  Legal: 'pi-briefcase',
  'Product Management': 'pi-box',
  Design: 'pi-pencil',
  DevOps: 'pi-cloud',
};

export const categoryIconsLowerCase = Object.keys(categoryIcons).reduce(
  (acc, key) => {
    acc[key.toLowerCase()] = categoryIcons[key];
    return acc;
  },
  {} as { [key: string]: string }
);
