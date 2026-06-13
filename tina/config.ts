import { defineConfig } from 'tinacms';

export default defineConfig({
  branch: process.env.HEAD ?? process.env.VERCEL_GIT_COMMIT_REF ?? 'main',
  // undefined = mode local (pas de TinaCloud, édition directe des fichiers)
  // valeur = mode cloud (auth TinaCloud requise, pour Vercel)
  clientId: process.env.TINA_CLIENT_ID || undefined,
  token:    process.env.TINA_TOKEN     || undefined,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },

  media: {
    tina: {
      publicFolder: 'public',
      mediaRoot:    'assets/img',
    },
  },

  schema: {
    collections: [

      // ─────────────────────────────────────────
      // HERO
      // ─────────────────────────────────────────
      {
        name:   'hero',
        label:  'Hero',
        path:   'src/content/sections',
        match:  { include: 'hero' },
        format: 'md',
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { name: 'heading',    label: 'Titre principal', type: 'string', required: true },
          { name: 'subheading', label: 'Sous-titre',      type: 'string', ui: { component: 'textarea' } },
          { name: 'cta_label', label: 'Texte du bouton',  type: 'string' },
          { name: 'cta_href',  label: 'Lien du bouton',   type: 'string' },
        ],
      },

      // ─────────────────────────────────────────
      // ABOUT
      // ─────────────────────────────────────────
      {
        name:   'about',
        label:  'À propos',
        path:   'src/content/sections',
        match:  { include: 'about' },
        format: 'md',
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { name: 'eyebrow', label: 'Surtitre', type: 'string' },
          {
            name:  'paragraphs',
            label: 'Paragraphes biographie',
            type:  'string',
            list:  true,
            ui:    { component: 'textarea' },
          },
          { name: 'closing', label: 'Phrase de clôture', type: 'string' },
          {
            name:  'pillars',
            label: 'Les 3 piliers',
            type:  'object',
            list:  true,
            ui:    { itemProps: (item: any) => ({ label: item?.title }) },
            fields: [
              { name: 'title',      label: 'Titre',             type: 'string' },
              { name: 'icon',       label: 'Icône (chemin)',     type: 'string' },
              { name: 'icon_hover', label: 'Icône hover (chemin)', type: 'string' },
              { name: 'body',       label: 'Texte descriptif',   type: 'string', ui: { component: 'textarea' } },
            ],
          },
        ],
      },

      // ─────────────────────────────────────────
      // WHY US
      // ─────────────────────────────────────────
      {
        name:   'why_us',
        label:  'Par où commencer ?',
        path:   'src/content/sections',
        match:  { include: 'why-us' },
        format: 'md',
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { name: 'eyebrow',      label: 'Surtitre',             type: 'string' },
          { name: 'heading',      label: 'Titre',                type: 'string', ui: { component: 'textarea' } },
          { name: 'heading_span', label: 'Extrait en vert',      type: 'string' },
          { name: 'sub',          label: 'Sous-titre',           type: 'string', ui: { component: 'textarea' } },
          {
            name:  'cards',
            label: 'Cartes (01 / 02 / 03)',
            type:  'object',
            list:  true,
            ui:    { itemProps: (item: any) => ({ label: `${item?.num} — ${item?.title}` }) },
            fields: [
              { name: 'num',   label: 'Numéro affiché', type: 'string' },
              { name: 'title', label: 'Titre',          type: 'string' },
              { name: 'intro', label: 'Introduction',   type: 'string', ui: { component: 'textarea' } },
              {
                name:  'bullets_label',
                label: 'Points avec étiquettes',
                type:  'object',
                list:  true,
                ui:    { itemProps: (item: any) => ({ label: item?.label }) },
                fields: [
                  { name: 'label', label: 'Étiquette', type: 'string' },
                  { name: 'text',  label: 'Texte',     type: 'string' },
                ],
              },
              {
                name:  'paras',
                label: 'Paragraphes',
                type:  'string',
                list:  true,
                ui:    { component: 'textarea' },
              },
              {
                name:  'bullets',
                label: 'Points simples',
                type:  'string',
                list:  true,
              },
              { name: 'kicker', label: "Phrase d'accroche", type: 'string' },
            ],
          },
        ],
      },

      // ─────────────────────────────────────────
      // FAQ
      // ─────────────────────────────────────────
      {
        name:   'faq',
        label:  'FAQ',
        path:   'src/content/sections',
        match:  { include: 'faq' },
        format: 'md',
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { name: 'eyebrow',      label: 'Surtitre',       type: 'string' },
          { name: 'heading',      label: 'Titre',          type: 'string' },
          { name: 'heading_span', label: 'Mot en vert',    type: 'string' },
          { name: 'sub',          label: 'Sous-titre',     type: 'string', ui: { component: 'textarea' } },
          {
            name:  'items',
            label: 'Questions / Réponses',
            type:  'object',
            list:  true,
            ui:    { itemProps: (item: any) => ({ label: item?.question }) },
            fields: [
              { name: 'question', label: 'Question', type: 'string' },
              {
                name:  'answer',
                label: 'Réponse (HTML autorisé)',
                type:  'string',
                ui:    { component: 'textarea' },
              },
              { name: 'open', label: 'Ouvert par défaut', type: 'boolean' },
            ],
          },
        ],
      },

      // ─────────────────────────────────────────
      // SERVICES SECTION (homepage tiles)
      // ─────────────────────────────────────────
      {
        name:   'services_section',
        label:  'Section Services (accueil)',
        path:   'src/content/sections',
        match:  { include: 'services' },
        format: 'md',
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { name: 'eyebrow',      label: 'Surtitre',    type: 'string' },
          { name: 'heading',      label: 'Titre',       type: 'string' },
          { name: 'heading_span', label: 'Mot en vert', type: 'string' },
          { name: 'sub',          label: 'Sous-titre',  type: 'string', ui: { component: 'textarea' } },
          {
            name:  'tiles',
            label: 'Tuiles services',
            type:  'object',
            list:  true,
            ui:    { itemProps: (item: any) => ({ label: item?.title }) },
            fields: [
              { name: 'title', label: 'Titre',           type: 'string' },
              { name: 'sub',   label: 'Sous-titre',      type: 'string' },
              { name: 'icon',  label: 'Icône (chemin)',  type: 'string' },
              { name: 'href',  label: 'Lien',            type: 'string' },
            ],
          },
        ],
      },

      // ─────────────────────────────────────────
      // PORTFOLIO SECTION
      // ─────────────────────────────────────────
      {
        name:   'portfolio_section',
        label:  'Réalisations (accueil)',
        path:   'src/content/sections',
        match:  { include: 'portfolio' },
        format: 'md',
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { name: 'eyebrow',      label: 'Surtitre',    type: 'string' },
          { name: 'heading',      label: 'Titre',       type: 'string' },
          { name: 'heading_span', label: 'Mot en vert', type: 'string' },
          { name: 'sub',          label: 'Sous-titre',  type: 'string', ui: { component: 'textarea' } },
          {
            name:  'filters',
            label: 'Filtres',
            type:  'object',
            list:  true,
            ui:    { itemProps: (item: any) => ({ label: item?.label }) },
            fields: [
              { name: 'id',    label: 'Identifiant', type: 'string' },
              { name: 'label', label: 'Libellé',     type: 'string' },
            ],
          },
          {
            name:  'items',
            label: 'Photos',
            type:  'object',
            list:  true,
            ui:    { itemProps: (item: any) => ({ label: `${item?.title} — ${item?.caption}` }) },
            fields: [
              { name: 'id',        label: 'Identifiant',       type: 'string' },
              { name: 'filter',    label: 'Filtre',            type: 'string' },
              { name: 'img',       label: 'Miniature (thumb)', type: 'image' },
              { name: 'img_large', label: 'Grande version (lightbox)', type: 'image' },
              { name: 'title',     label: 'Titre',             type: 'string' },
              { name: 'caption',   label: 'Légende',           type: 'string' },
            ],
          },
        ],
      },

      // ─────────────────────────────────────────
      // CONTACT
      // ─────────────────────────────────────────
      {
        name:   'contact',
        label:  'Contact',
        path:   'src/content/sections',
        match:  { include: 'contact' },
        format: 'md',
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { name: 'eyebrow',            label: 'Surtitre',                  type: 'string' },
          { name: 'heading',            label: 'Titre',                     type: 'string' },
          { name: 'heading_span',       label: 'Mot en vert',               type: 'string' },
          { name: 'sub',                label: 'Sous-titre',                type: 'string', ui: { component: 'textarea' } },
          { name: 'address',            label: 'Adresse',                   type: 'string' },
          { name: 'email',              label: 'Email',                     type: 'string' },
          { name: 'phone',              label: 'Téléphone',                 type: 'string' },
          { name: 'formspree_id',       label: 'ID Formspree',              type: 'string' },
          { name: 'formspree_redirect', label: 'URL redirection Formspree', type: 'string' },
          { name: 'map_img',            label: 'Image carte (chemin)',       type: 'string' },
          { name: 'map_alt',            label: 'Alt texte carte',           type: 'string' },
        ],
      },

      // ─────────────────────────────────────────
      // PAGES SERVICES (métadonnées + contenu)
      // ─────────────────────────────────────────
      {
        name:   'service_pages',
        label:  'Pages services',
        path:   'src/content/services',
        format: 'md',
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { name: 'title',       label: 'Titre SEO',          type: 'string' },
          { name: 'description', label: 'Description SEO',    type: 'string', ui: { component: 'textarea' } },
          { name: 'keywords',    label: 'Mots-clés SEO',      type: 'string', ui: { component: 'textarea' } },
          { name: 'breadcrumb',  label: "Intitulé fil d'Ariane", type: 'string' },
          {
            name:  'content_html',
            label: 'Contenu principal (HTML)',
            type:  'string',
            ui:    { component: 'textarea' },
          },
        ],
      },

    ],
  },
});
