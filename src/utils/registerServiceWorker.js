// We register a service worker to serve assets from local cache in production.

// By doing this, app load faster on subsequent visits in production,
// and this also gives it offline capabilities. However, it also means that developers (and users)
// will be able to see only the deployed updates on the "N+1" visit to a page,
// since previously cached resources are updated in the background.

const _isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // The IPv6 localhost address is [::1]
    window.location.hostname === '[::1]' ||
    //The localhost for IPv4 is 127.0.0.1/8
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
)

export default function register() {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // URL constructor is available in all browsers that support SW.
    const _publicUrl = new URL(process.env.PUBLIC_URL, window.location)
    if (_publicUrl.origin !== window.location.origin) {
      //If PUBLIC_URL is on a different origin from what our page is served on,
      // our service worker won't work. This might happen if a CDN is used to
      // for serving assets; see https://github.com/facebookincubator/create-react-app/issues/2374
      return
    }

    window.addEventListener('load', () => {
      const _swUrl = `${process.env.PUBLIC_URL}/service-worker.js`

      if (!_isLocalhost) {
        // If its not local host, Just register service worker
        registerValidSW(_swUrl)
      } else {
        // It is running on localhost. Lets check if a service worker still exists or not.
        checkValidServiceWorker(_swUrl)
      }
    })
  }
}

function registerValidSW(_swUrl) {
  navigator.serviceWorker
    .register(_swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const _installingWorker = registration.installing
        _installingWorker.onstatechange = () => {
          if (_installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point of time, the old content will have been purged and
              // the fresh/new content will have been added to the cache.
              // This is the perfect time to display a
              // "New content is available; please refresh." message in your web application.
              console.log('New content is available; please refresh.')
            } else {
              // Here, everything has been precached.
              // This is the perfect time to display a "Content is cached for offline use." message.
              console.log('Content is cached for offline use.')
            }
          }
        }
      }
    })
    .catch(error => {
      console.error('Error during service worker registration:', error)
    })
}

function checkValidServiceWorker(_swUrl) {
  //If it can't reload the page, check if the service worker can be found.
  fetch(_swUrl)
    .then(response => {
      // Please ensure that our service worker exists, and that we really are getting a JS file.
      if (
        response.status === 404 ||
        response.headers.get('content-type').indexOf('javascript') === -1
      ) {
        //If no service worker found. Probably a different application. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload()
          })
        })
      } else {
        // If Service worker found. Proceed as normal.
        registerValidSW(_swUrl)
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      )
    })
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister()
    })
  }
}
