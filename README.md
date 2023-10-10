# React Reveal.js with Code Surfer

[![npm version](https://badge.fury.io/js/react-revealjs-with-code-surfer.svg)](https://badge.fury.io/js/react-revealjs-with-code-surfer)

This is an assortment of unstyled utility React components that allow you to easily use
[`Code Surfer`](https://github.com/pomber/code-surfer) in [`reveal.js`](https://revealjs.com/)
presentations, without the need to use [`mdx-deck`](https://github.com/jxnblk/mdx-deck)

## Installation

```bash
npm install react-revealjs-with-code-surfer
```

or

```bash
yarn add react-revealjs-with-code-surfer
```

## Why?

I created this after I struggled using the amazing `code-surfer` package along with the equally amazing `reveal.js`
for a presentation I was making. `code-surfer` is tightly coupled with `mdx-deck` by default, which makes
it difficult to use with any other presentation library.

But if there is a will there is a way.

![showcase](./assets/showcase.gif)

_No mdx-deck!_

## API

### Components

#### `SurferCode`

Provides you with a Code Surfer code panel, with keyboard controls and animations enabled.
Must be used inside a `RevealJSInstanceProvider`. Should be used inside a `SurferSlideIDProvider`
if you have many `SurferCode` code panels, but can be used without one if you only have one.

**Props**

- `steps: InputStep[]` : An array of input step elements. See below for info
- `theme?: string` : One of the available themes bundled with `code-surfer`. Autocomplete gives you all the options.
- `nav?: {next: KeyboardEvent['code'], previous: KeyboardEvent['code']}` : Define which keys you want to use to control the Code Surfer code panel. Default keys are `[` and `]` since `reveal.js` uses the arrows.

```typescript
interface InputStep {
  code: string;
  /*
   * number -> line
   * numberA:numberB -> from line A to line B
   * numberA,numberB,numberC -> line A and line B and line C
   * [] -> columns
   * numberA[numberB] -> column B from line A
   * numberA[numberB:numberC] -> column B through column C from line A
   * numberA[numberB,numberC] -> column B and column C from line A
   * See https://github.com/pomber/code-surfer#focus
   */
  focus?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  lang?: string;
  showNumbers?: boolean;
}
```

---

#### `SurferSlide`

A utility component that provides a `section` slide with a slide ID. Must be used inside a `SurferSlideIDProvider`

**Props**

- `children: ReactNode` : `children`
- `...rest: HTMLProps<HTMLElement>` : whatever HTML attribute you want to pass to the underlying `section` element. `data-code-surfer` values will be ignored

```jsx
// example

<SurferSlideIDProvider>
  <SurferSlide className="will-be-passed-to-the-section-element">
    <div className="r-stretch text-left">
      <SurferCode steps={props.steps} />
    </div>
    <aside className={'notes'}>Some notes</aside>
  </SurferSlide>
</SurferSlideIDProvider>
```

---

#### `SurferSlideIDProvider`

A simple provider that creates a unique ID and passes it down to children. Necessary to use if
you have many Code Surfer code panels, otherwise navigating in one will navigate every single one
(if you are using the same navigation keys in every single one)

**Props**

- `children: ReactNode`
- `id?: string` : You may pass a predefined id if you know that it will be unique

---

#### `RevealJSProvider`

A provider that initializes a `reveal.js` instance and passes it down. Accepts a `reveal.js` options
object, however `viewdistance` will be ignored since it must always be `Infinity` otherwise
Code Surfer code panels in distant slides have sizing issues

**Props**

- `children: ReactNode`
- `config?: Omit<RevealJS.Options, 'viewDistance'>` : Default config is `{ plugins: [RevealNotes], hash: true, }`
- `exposeToWindow?: boolean` : Chose to expose the reveal.js instance to the `window` object. Default is `false`.
- `onInitialize?: (revealInstance: Reveal.Api) => void` : Callback function you can pass that will be executed after reveal.js has initialized and _after_ the reveal.js instance has been set as the current reveal.js instance internally in the provider state.

---

### Hooks

#### `useCodeSurferSlideID`

A hook that if it's used inside the descendants of a `SurferSlideIDProvider` it returns the unique
id that is needed to exist as a `data-code-surfer` attribute on the slide `section` in order to
isolate code navigation to the currently visible Code Surfer code panel. Returns `''` if it's
used outside of a context provider.

#### `useRevealJSInstance`

A hook that if it's used inside the descendants of a `RevealJSInstanceProvider` it returns the unique
currently initialized `reveal.js` instance. Returns `null` if it's
used outside of a context provider or if the `reveal.js` instance has not completed initializing yet.

## Notes

You will need to have `reveal.js`, `react`, `react-dom` and their types installed in your own project.
This package only requires them as peer dependencies.
