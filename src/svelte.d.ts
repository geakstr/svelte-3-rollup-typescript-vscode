declare module "*.svelte" {
  interface ComponentOptions<Props> {
    target: HTMLElement;
    anchor?: HTMLElement | null;
    props?: Props;
    hydrate?: boolean;
    intro?: boolean;
  }

  interface Component<Props> {
    new (options: ComponentOptions<Props>): any;
    $set(props: {}): void;
    $on(event: string, callback: (event: CustomEvent) => void): void;
    $destroy(): void;
    render(props?: {}): {
      html: string;
      css: { code: string; map: string | null };
      head?: string;
    };
  }

  const component: Component<{}>;

  export default component;
}
