// src/environments/environment.prod.ts  (production)
export const environment = {
  production: true,
  apiUrl: 'https://ton-api.railway.app/api', // ← remplace après déploiement
  emailjs: {
    serviceId:  'service_szj6dkt',   // ← remplace par le tien
    templateId: 'template_celbb2k',  // ← remplace par le tien
    publicKey:  'Wp0muAsYdx_ArErC1',     // ← remplace par le tien
  }
};