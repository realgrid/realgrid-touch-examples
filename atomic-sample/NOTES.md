SPA Router

### ✅ 정리부터 하면...

| 구성 방식 | Vanilla JS에서 가능? | 설명                             |
| ----- | ---------------- | ------------------------------ |
| MPA   | ✅ 매우 쉬움          | HTML 여러 개 만들면 끝                |
| SPA   | ✅ 가능함            | JS로 라우팅 직접 구현 필요 (history API) |

---

## ✅ Vanilla JS + SPA 구성 요약

> **하나의 `index.html`로 진입하고, JS로 URL 변화 감지 및 내용 교체**

---

## 🧱 기본 구성

```
project/
├── index.html          ← 진입점 (하나만 사용)
├── src/
│   ├── main.ts
│   ├── views/
│   │   ├── home.ts
│   │   ├── about.ts
│   │   └── notfound.ts
│   └── router.ts
```

---

## 📄 index.html

```html
<!DOCTYPE html>
<html>
  <body>
    <nav>
      <a href="/" data-link>Home</a>
      <a href="/about" data-link>About</a>
    </nav>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

---

## 📄 main.ts

```ts
import { initRouter } from './router';
import './styles/global.css';

window.addEventListener('DOMContentLoaded', () => {
  initRouter();
});
```

---

## 📄 router.ts

```ts
import { renderHome } from './views/home';
import { renderAbout } from './views/about';
import { renderNotFound } from './views/notfound';

export function initRouter() {
  document.body.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.matches('[data-link]')) {
      e.preventDefault();
      const path = target.getAttribute('href');
      if (path) {
        history.pushState(null, '', path);
        handleRoute(path);
      }
    }
  });

  window.addEventListener('popstate', () => {
    handleRoute(location.pathname);
  });

  handleRoute(location.pathname);
}

function handleRoute(path: string) {
  const app = document.getElementById('app');
  if (!app) return;

  switch (path) {
    case '/':
      app.innerHTML = renderHome();
      break;
    case '/about':
      app.innerHTML = renderAbout();
      break;
    default:
      app.innerHTML = renderNotFound();
  }
}
```

---

## 📄 views/home.ts

```ts
export function renderHome(): string {
  return `<h1>Home Page</h1><p>Welcome to the homepage.</p>`;
}
```

📄 views/about.ts, views/notfound.ts도 같은 방식

---

## 🧩 Vite 설정: SPA fallback

📄 `vite.config.ts`에 다음 추가:

```ts
export default defineConfig({
  server: {
    historyApiFallback: true
  }
});
```

> 👉 안 하면 `/about`으로 직접 들어갈 경우 404 발생

---

## ✅ 결과

* 모든 페이지 요청은 `index.html`로 처리됨
* 내부 라우팅은 JS (`pushState`)로 처리
* 주소는 `/`, `/about` 등 SPA처럼 유지
* 프레임워크 없이도 완전한 SPA 구성 가능

---

## ✨ 결론

| 프레임워크 없음           | 괜찮음                 |
| ------------------ | ------------------- |
| `index.html` 하나    | ✅ 유지                |
| JS로 라우팅            | ✅ 직접 구현 (위 예시 참고)   |
| Vite + history API | ✅ 잘 작동함             |
| 자동완성 + 타입추론        | ✅ TypeScript로 완전 가능 |

---