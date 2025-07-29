// components/icons/ClaimStatusIcons.js

export const InProgressIcon = ({
  selected,
  selectedColor,
  unselectedColor,
  width = 24,
  height = 18,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 18"
    fill="none"
  >
    <path
      d="M10.3202 17.1146H6.38656C5.60569 17.1136 4.83395 16.9466 4.12256 16.6246C3.41116 16.3026 2.77637 15.8331 2.2603 15.247C1.74424 14.661 1.35871 13.9719 1.12928 13.2255C0.89986 12.4791 0.831794 11.6924 0.9296 10.9177C1.02741 10.143 1.28885 9.3979 1.69658 8.73193C2.10431 8.06596 2.64901 7.49431 3.29453 7.05492C3.94005 6.61553 4.67163 6.31844 5.44073 6.18336C6.20984 6.04828 6.99887 6.07831 7.75548 6.27145"
      stroke={selected ? selectedColor : unselectedColor}
      strokeWidth="1.68759"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.1071 12.3942L14.254 9.24731L17.4009 12.3942"
      stroke={selected ? selectedColor : unselectedColor}
      strokeWidth="1.68759"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.2543 17.1146V9.24731"
      stroke={selected ? selectedColor : unselectedColor}
      strokeWidth="1.68759"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.17334 9.24732C7.17367 7.82899 7.55742 6.43714 8.28397 5.21904C9.01052 4.00095 10.0528 3.00192 11.3007 2.32767C12.5485 1.65342 13.9553 1.32903 15.3724 1.38883C16.7894 1.44864 18.164 1.89041 19.3505 2.66739C20.5371 3.44438 21.4916 4.52768 22.1129 5.80266C22.7342 7.07764 22.9993 8.49688 22.8802 9.91018C22.761 11.3235 22.262 12.6783 21.4359 13.8312C20.6099 14.9842 19.4875 15.8924 18.1876 16.4597"
      stroke={selected ? selectedColor : unselectedColor}
      strokeWidth="1.68759"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SentIcon = ({
  selected,
  selectedColor,
  unselectedColor,
  width = 24,
  height = 18,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 23 23"
    fill="none"
  >
    <path
      d="M10.5239 12.6607L15.6485 7.53613"
      stroke={selected ? selectedColor : unselectedColor}
      strokeWidth="1.70901"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.9251 2.23198C21.9631 2.09712 21.9645 1.95456 21.9291 1.81899C21.8937 1.68342 21.8229 1.55973 21.7238 1.46065C21.6247 1.36158 21.501 1.29069 21.3654 1.2553C21.2299 1.21991 21.0873 1.22129 20.9524 1.25929L2.0308 6.99689C1.87633 7.04048 1.73883 7.1302 1.63671 7.25403C1.53458 7.37786 1.47268 7.52992 1.45929 7.68987C1.4459 7.84983 1.48165 8.01006 1.56176 8.14915C1.64188 8.28824 1.76254 8.39956 1.90762 8.46824L10.5239 12.6606L14.7162 21.2758C14.7849 21.4209 14.8962 21.5416 15.0353 21.6217C15.1744 21.7018 15.3346 21.7375 15.4946 21.7242C15.6545 21.7108 15.8066 21.6489 15.9304 21.5467C16.0542 21.4446 16.1439 21.3071 16.1875 21.1526L21.9251 2.23198Z"
      stroke={selected ? selectedColor : unselectedColor}
      strokeWidth="1.70901"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const RecoveredIcon = ({
  selected,
  selectedColor,
  unselectedColor,
  width = 24,
  height = 18,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 27 26"
    fill="none"
  >
    <path
      d="M8.58636 13.9673L11.5148 16.8957L18.3477 10.0627"
      stroke={selected ? selectedColor : unselectedColor}
      strokeWidth="1.70901"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.467 24.7045C19.9363 24.7045 25.1806 19.4601 25.1806 12.9909C25.1806 6.52169 19.9363 1.27734 13.467 1.27734C6.99782 1.27734 1.75348 6.52169 1.75348 12.9909C1.75348 19.4601 6.99782 24.7045 13.467 24.7045Z"
      stroke={selected ? selectedColor : unselectedColor}
      strokeWidth="1.70901"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChatIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="19"
    viewBox="0 0 25 25"
    fill="none"
  >
    <path
      d="M8.49866 9.7478H15.4983"
      stroke="#FAFBFE"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.49866 13.2476H15.4983"
      stroke="#FAFBFE"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.74111 20.5873C8.94659 21.8638 11.541 22.2946 14.0407 21.7994C16.5403 21.3043 18.7746 19.9169 20.3269 17.8961C21.8792 15.8753 22.6437 13.3589 22.4777 10.8161C22.3117 8.27327 21.2266 5.87761 19.4247 4.07574C17.6229 2.27387 15.2272 1.18879 12.6844 1.0228C10.1416 0.85681 7.62519 1.62124 5.60437 3.17357C3.58354 4.72589 2.19623 6.96017 1.70107 9.45982C1.20591 11.9595 1.63672 14.5539 2.91316 16.7594L1.54494 20.8444C1.49353 20.9985 1.48607 21.164 1.52339 21.3221C1.56072 21.4803 1.64136 21.6249 1.75627 21.7398C1.87118 21.8548 2.01583 21.9354 2.174 21.9727C2.33216 22.01 2.4976 22.0026 2.65176 21.9512L6.74111 20.5873Z"
      stroke="#FAFBFE"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
