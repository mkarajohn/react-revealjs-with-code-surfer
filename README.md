# React Reveal.js with Code Surfer

This is an assortment of utility React components that allow you to easily use
[`Code Surfer`](https://github.com/pomber/code-surfer) in [`reveal.js`](https://revealjs.com/)
presentations, without the need to use [`mdx-deck`](https://github.com/jxnblk/mdx-deck)

## Why?

I created this after I struggled using the amazing `code-surfer` package with a `reveal.js`
presentation I was making. `code-surfer` is tightly coupled with `mdx-deck` by default, which makes
it difficult to use with any other presentation library.

But if there is a will there is a way.

## API

### `SurferCode`

Provides you with a Code Surfer code panel, with keyboard controls and animations enabled. 
Must be used inside a `RevealJSInstanceProvider`. Should be used inside a `SurferSlideIDProvider` 
if you have many Code Surfer code panels, but can be used without one if you only have one.

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

### `SurferSlide`

A utility component that provides a `section` slide with a slide ID. Must be used inside a `SurferSlideIDProvider`

- `children: ReactNode` : `children` should be used for reveal.js notes. Passing visual elements may look weird.
- `...rest: HTMLProps<HTMLElement>` : whatever HTML attribute you want to pass it. `data-code-surfer` values will be ignored

```jsx
// example

<SurferSlideIDProvider>
  <SurferSlide className="sdasda">
    <div className="r-stretch text-left">
      <SurferCode steps={props.steps} />
    </div>
    <aside className={'notes'}>Some notes</aside>
  </SurferSlide>
</SurferSlideIDProvider>
```

### `SurferSlideIDProvider`

A simple provider that creates a unique ID and passes it down to children. Necessary to use if 
you have many Code Surfer code panels, otherwise navigating in one will navigate every single one
(if you are using the same navigation keys in every single one)

* `id?: string` : You may pass a predefined id if you know that it will be unique

### `RevealJSProvider`

A provider that initializes a `reveal.js` instance and passes it down. Accepts a `reveal.js` options 
object, however `viewdistance` will be ignored since it must always be `Infinity` otherwise 
Code Surfer code panels in distant slides have sizing issues

* `children: ReactNode`
* `config?: Omit<RevealJS.Options, 'viewDistance'>` : Default config is `{ plugins: [RevealNotes], hash: true, }`

### `useCodeSurferSlideID`

A hook that if it's used inside the descendants of a `SurferSlideIDProvider` it returns the unique 
id that is needed to exist as a `data-code-surfer` attribute on the slide `section` in order to 
isolate code navigation to the currently visible Code Surfer code panel. Returns `'''` if it's 
used outside of a context provider.

### `useRevealJSInstance`

A hook that if it's used inside the descendants of a `RevealJSInstanceProvider` it returns the unique 
currently initialized `reveal.js` instance. Returns `null` if it's 
used outside of a context provider or if the `reveal.js` instance has not completed initializing yet.