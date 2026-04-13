import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Gallery Content')
    .items([
      // Paintings
      S.listItem()
        .title('Paintings')
        .schemaType('painting')
        .child(S.documentTypeList('painting').title('All Paintings')),

      // Collections
      S.listItem()
        .title('Collections')
        .schemaType('collection')
        .child(S.documentTypeList('collection').title('All Collections')),

      S.divider(),

      // Artist Profile (singleton)
      S.listItem()
        .title('Artist Profile')
        .child(
          S.document().schemaType('artistProfile').documentId('artistProfile')
        ),

      // Site Settings (singleton)
      S.listItem()
        .title('Site Settings')
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings')
        ),

      S.divider(),

      // FAQs
      S.listItem()
        .title('FAQs')
        .schemaType('faq')
        .child(S.documentTypeList('faq').title('All FAQs')),
    ]);
