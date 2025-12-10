// Register Service Worker for PWA functionality
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/Rezerv/service-worker.js')
    .then(() => console.log('Service Worker зареєстровано'))
    .catch(() => console.log('Помилка реєстрації Service Worker'));
}
