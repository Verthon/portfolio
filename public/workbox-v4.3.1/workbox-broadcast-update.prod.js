;(this.workbox = this.workbox || {}),
  (this.workbox.broadcastUpdate = (function (e, t) {
    'use strict'
    try {
      self['workbox:broadcast-update:4.3.1'] && _()
    } catch (e) {}
    const s = (e, t, s) => {
        return (
          !s.some((s) => e.headers.has(s) && t.headers.has(s)) ||
          s.every((s) => {
            const n = e.headers.has(s) === t.headers.has(s),
              a = e.headers.get(s) === t.headers.get(s)
            return n && a
          })
        )
      },
      n = 'workbox',
      a = 1e4,
      i = ['content-length', 'etag', 'last-modified'],
      o = async ({ channel: e, cacheName: t, url: s }) => {
        const n = {
          type: 'CACHE_UPDATED',
          meta: 'workbox-broadcast-update',
          payload: { cacheName: t, updatedURL: s },
        }
        if (e) e.postMessage(n)
        else {
          const e = await clients.matchAll({ type: 'window' })
          for (const t of e) t.postMessage(n)
        }
      }
    class c {
      constructor({
        headersToCheck: e,
        channelName: t,
        deferNoticationTimeout: s,
      } = {}) {
        ;(this.t = e || i), (this.s = t || n), (this.i = s || a), this.o()
      }
      notifyIfUpdated({
        oldResponse: e,
        newResponse: t,
        url: n,
        cacheName: a,
        event: i,
      }) {
        if (!s(e, t, this.t)) {
          const e = (async () => {
            i &&
              i.request &&
              'navigate' === i.request.mode &&
              (await this.h(i)),
              await this.l({ channel: this.u(), cacheName: a, url: n })
          })()
          if (i)
            try {
              i.waitUntil(e)
            } catch (e) {}
          return e
        }
      }
      async l(e) {
        await o(e)
      }
      u() {
        return (
          'BroadcastChannel' in self &&
            !this.p &&
            (this.p = new BroadcastChannel(this.s)),
          this.p
        )
      }
      h(e) {
        if (!this.m.has(e)) {
          const s = new t.Deferred()
          this.m.set(e, s)
          const n = setTimeout(() => {
            s.resolve()
          }, this.i)
          s.promise.then(() => clearTimeout(n))
        }
        return this.m.get(e).promise
      }
      o() {
        ;(this.m = new Map()),
          self.addEventListener('message', (e) => {
            if (
              'WINDOW_READY' === e.data.type &&
              'workbox-window' === e.data.meta &&
              this.m.size > 0
            ) {
              for (const e of this.m.values()) e.resolve()
              this.m.clear()
            }
          })
      }
    }
    return (
      (e.BroadcastCacheUpdate = c),
      (e.Plugin = class {
        constructor(e) {
          this.l = new c(e)
        }
        cacheDidUpdate({
          cacheName: e,
          oldResponse: t,
          newResponse: s,
          request: n,
          event: a,
        }) {
          t &&
            this.l.notifyIfUpdated({
              cacheName: e,
              oldResponse: t,
              newResponse: s,
              event: a,
              url: n.url,
            })
        }
      }),
      (e.broadcastUpdate = o),
      (e.responsesAreSame = s),
      e
    )
  })({}, workbox.core._private))
//# sourceMappingURL=workbox-broadcast-update.prod.js.map
