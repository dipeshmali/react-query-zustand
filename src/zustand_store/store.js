import { create } from 'zustand';
import { devtools } from '@pavlobu/zustand/middleware'

const useStore = create(devtools((set) => ({
    count: 0,
    posts: [],
    add: () => set((state) => ({
        count: state.count + 1,
    }), false, 'increment'),
    subtraction: () => set((state) => ({
        count: state.count - 1
    }), false, 'decerment'),

    savePost: (data) => set((state) => ({
        posts: [...state.posts, data]
    }), false, 'save-post'),
})))

export { useStore }

