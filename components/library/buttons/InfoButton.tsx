import React, { useState } from "react";
import getConfig from "next/config";

import StandardContainer from "../StandardContainer";
import Icons from "../Icons";

const { publicRuntimeConfig } = getConfig();

const InfoButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const styles = {
    paragraph: "mb-md",
    link: "text-primary underline",
  };

  return (
    <StandardContainer
      onClick={() => setIsModalOpen(!isModalOpen)}
      padding="sm"
      width="w-[50px]"
      className="h-[50px] ml-auto"
      round
    >
      <div className="relative h-full w-full cursor-pointer pointer-events-auto">
        <Icons icon="information" color="#353535" />
      </div>
      {isModalOpen && (
        <StandardContainer
          width="w-[400px]"
          height="h-[400px]"
          className="absolute left-1/2 -translate-x-1/2 bottom-1/2 -translate-y-1/2 !items-start z-[10] pointer-events-auto"
        >
          <div className="w-full">
            <p className={styles.paragraph + " text-center text-neutral-600"}>
              <i className="text-gray ">v{publicRuntimeConfig?.version}</i>
            </p>
            <p className={styles.paragraph}>
              STHLM MC Parking utvecklas och underhålls av Sofia Johnsson.
            </p>
            <p className={styles.paragraph}>
              All data gällande gator och parkeringar hämtas från Stockholms
              Stads lokala vägdatabas och parkerings API. Ingen data lagras av
              applikationen.
            </p>
            <p className={styles.paragraph}>
              Källkod:
              <br />
              <a
                href="https://github.com/1Tolv2/sthlm-mc-parking-pwa"
                className={styles.link}
              >
                github.com/1Tolv2/sthlm-mc-parking-pwa
              </a>
            </p>
            <p className={styles.paragraph}>
              Hittat en bugg?
              <br />
              {
                "Maila en beskrivning på felet och en bild om det är visuellt till "
              }
              <a
                href="mailto:sofiaq1+sthlmMcParking@gmail.com"
                className={styles.link}
              >
                SofiaQ1+sthlmMcParking@gmail.com
              </a>
            </p>
          </div>
        </StandardContainer>
      )}
    </StandardContainer>
  );
};

export default InfoButton;
