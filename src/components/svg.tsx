import type { Component } from 'solid-js';

export const ArrowDownIcon: Component<{ styleClass: string }> = props => {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="11"
      height="15"
      viewBox="0 0 96.154 96.154"
      class={props.styleClass}
    >
      <g>
        <path
          d="M0.561,20.971l45.951,57.605c0.76,0.951,2.367,0.951,3.127,0l45.956-57.609c0.547-0.689,0.709-1.716,0.414-2.61
		c-0.061-0.187-0.129-0.33-0.186-0.437c-0.351-0.65-1.025-1.056-1.765-1.056H2.093c-0.736,0-1.414,0.405-1.762,1.056
		c-0.059,0.109-0.127,0.253-0.184,0.426C-0.15,19.251,0.011,20.28,0.561,20.971z"
        />
      </g>
    </svg>
  );
};

export const Triangulum: Component<{ svgClass: string }> = props => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      x="0px"
      y="0px"
      width="11"
      height="15"
      viewBox="0 0 511.509 511.509"
      class={props.svgClass}
    >
      <g>
        <g>
          <path
            d="M498.675,493.845L265.16,5.568c-3.541-7.424-15.701-7.424-19.243,0L11.251,496.235c-1.579,3.307-1.344,7.189,0.597,10.283
			s5.355,4.992,9.024,4.992h469.76c5.888,0,10.667-4.779,10.667-10.667C501.299,498.176,500.317,495.723,498.675,493.845z"
          />
        </g>
      </g>
    </svg>
  );
};
