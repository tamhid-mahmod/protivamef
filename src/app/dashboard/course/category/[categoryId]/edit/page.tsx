import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';
import { getCategory } from 'src/actions/category-ssr';

import { CategoryEditView } from 'src/sections/category/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Category edit | Dashboard - ${CONFIG.appName}` };

type Props = {
  params: { categoryId: string };
};

export default async function Page({ params }: Props) {
  const { categoryId } = params;

  const { category } = await getCategory(categoryId);

  return <CategoryEditView category={category} />;
}
