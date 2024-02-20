import React from "react";

type Props = {
  primaryColor?: string;
  secondaryColor?: string;
  withSilhouette?: boolean;
};

const LoadingAnimation = ({
  primaryColor = "#FFF",
  secondaryColor,
  withSilhouette,
}: Props) => {
  secondaryColor = secondaryColor ?? primaryColor;
  const icon = {
    motorcycle: () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
        <path
          fill={primaryColor}
          d="M157 856q-65 0-111-45.5T0 699q0-66 45.5-111.5T156 542l-47-36H0v-50h181l99 60 159-60h140l-78-100h-89v-60h119l86 111 129-64v104h-98l85 110q17-7 34-10.5t35-3.5q66 0 112 45.5T960 700q0 66-46 111t-112 45q-65 0-110.5-45.5T646 700q0-30 10-57t30-49l-35-45-146 223H395l-81-73q0 66-45.5 111.5T157 856Zm0-60q41 0 69-28.5t28-68.5q0-40-28-68.5T157 602q-40 0-68.5 28T60 699q0 41 28.5 69t68.5 28Zm645 0q41 0 69.5-28t28.5-68q0-41-28.5-69.5T802 602q-40 0-68 28.5T706 700q0 40 28 68t68 28Z"
        />
      </svg>
    ),
    road: () => (
      <svg viewBox="0 0 48 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 1H3V4H0V1Z" fill={secondaryColor} />
        <path d="M42.5 4.5H45.5V7.5H42.5V4.5Z" fill={secondaryColor} />
        <path d="M6 3H9V6H6V3Z" fill={secondaryColor} />
        <path d="M14 0H17V3H14V0Z" fill={secondaryColor} />
        <path d="M2 7H5V10H2V7Z" fill={secondaryColor} />
        <path d="M35.5 7H38.5V10H35.5V7Z" fill={secondaryColor} />
        <path d="M37 0H40V3H37V0Z" fill={secondaryColor} />
        <path d="M30 2H33V5H30V2Z" fill={secondaryColor} />
        <path d="M16 6H19V9H16V6Z" fill={secondaryColor} />
        <path d="M24 5H27V8H24V5Z" fill={secondaryColor} />
      </svg>
    ),
    silhouette: () => (
      <svg
        viewBox="0 0 1019 1019"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.6">
          <path
            d="M0 280.5H52.5C52.5 222.51 99.5101 175.5 157.5 175.5H193.5C251.49 175.5 298.5 222.51 298.5 280.5H351V1018.5H0V280.5Z"
            fill="#C6BDF9"
          />
          <path
            d="M790.902 314.824C798.133 309.4 803.565 301.926 806.49 293.374L807.346 290.874C808.11 288.64 808.5 286.295 808.5 283.934V210.5H843.5V193C843.5 163.453 867.453 139.5 897 139.5C925.719 139.5 949 162.781 949 191.5V210.5H984V283.79C984 286.246 984.406 288.686 985.201 291.01L986.019 293.401C988.945 301.953 994.266 309.485 1001.35 315.098C1011.35 323.026 1017.73 334.8 1019 347.5V1018.5H773V347.5C773.634 334.829 779.871 323.097 790.02 315.485L790.902 314.824Z"
            fill="#C6BDF9"
          />
          <path
            d="M422 385L446.076 369.523C474.698 351.123 492 319.431 492 285.405V228L515.284 204.716C522.786 197.214 527 187.04 527 176.431V105C548.322 97.192 562.5 76.9012 562.5 54.1946V17.5L597 0L633 17.5V55.132C633 77.315 646.742 97.1781 667.5 105V176.6C667.5 187.109 671.636 197.196 679.013 204.68L702 228V284.987C702 319.242 719.533 351.113 748.466 369.451L773 385V1018.5H422V385Z"
            fill="#C6BDF9"
          />
        </g>
      </svg>
    ),
  };

  return (
    <div className="relative w-24 sm:w-40">
      {withSilhouette && (
        <div className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bottom-1/2 left-1/2 -translate-x-1/2">
          {icon.silhouette()}
        </div>
      )}
      <div className="relative w-full h-full overflow-hidden">
        <div className="animate-shake">{icon.motorcycle()}</div>
        <div className="animate-marquee relative -top-4 w-[200%]">
          <span className="float-left w-1/2">{icon.road()}</span>
          <span className="float-left w-1/2">{icon.road()}</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
