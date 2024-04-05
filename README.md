# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



## React Query Working 
- React Query **caches resulting data for 5 min** by default.
- lets suppose we have 2 link home & post when user move between 2 link data will cache for 5 min
- that means when user come back to same link or request , react query first check for cache data if it exist then directly return it, **but in background its refetching data from sever and compare the result if any change then update cache data and return updated result on the UI**
- We can do change in cache time using  **cacheTime** property
- Refetching data is default beahaviour of React Query, if you suppose to dont do this for some time lets say for 1 minute then you can "stale" data using **staleTime** property, so that way it will not refetch and continue serve cache data only.
- Initial api call intermine by **isLoading** flag and refetching data will determine by **isFatching** flag
