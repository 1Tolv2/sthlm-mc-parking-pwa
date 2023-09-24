import React from "react";
import Modal from "../../components/library/ParkingDetails/Modal";
import Description from "../../components/library/ParkingDetails/Description";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { CoordinateItem, FeatureItem } from "../../types";
import { getCurrentRate } from "../../components/library/ParkingDetails/getCurrentRate";
import getParkingRates from "../../utils/getParkingRates";

const mockTargetedParkingSpot: FeatureItem = {
  type: "Feature",
  id: "LTFR_P_MOTORCYKEL.2384888",
  geometry: {
    type: "LineString",
    coordinates: [
      [18.086901, 59.292465],
      [18.086918, 59.292436],
      [18.086926, 59.29242],
    ] as unknown as CoordinateItem[],
  },
  geometry_name: "GEOMETRY",
  properties: {
    FID: 2384888,
    FEATURE_OBJECT_ID: 16651373,
    FEATURE_VERSION_ID: 1,
    EXTENT_NO: 1,
    VALID_FROM: "2019-05-31T22:00:00Z",
    CITATION: "0180 2019-02156",
    STREET_NAME: "Pastellvägen",
    CITY_DISTRICT: "Johanneshov",
    PARKING_DISTRICT: "Hammarbyhöjden",
    ADDRESS: "Pastellvägen 12",
    VF_METER: 5,
    VF_PLATS_TYP: "Reserverad p-plats motorcykel",
    OTHER_INFO: "Servicetid fredag 08:00-16:00 1/11 - 15/5",
    RDT_URL:
      "https://rdt.transportstyrelsen.se/rdt/AF06_View.aspx?BeslutsMyndighetKod=0180&BeslutadAr=2019&LopNr=02156",
    PARKING_RATE:
      "taxa 14: Vardagar utom vardag före sön- och helgdag klockan 07.00 - 19.00 och vardag före sön- och helgdag klockan 11.00 - 17.00,  2,50 kr/tim.",
    START_TIME: 0,
    END_TIME: 0,
    START_WEEKDAY: "måndag",
  },
};

const mockTargetedParkingSpotTaxa12: FeatureItem = {
  type: "Feature",
  id: "LTFR_P_MOTORCYKEL.2386245",
  geometry: {
    type: "LineString",
    coordinates: [
      [18.047534, 59.343047],
      [18.047487, 59.343044],
      [18.047359, 59.343041],
    ] as unknown as CoordinateItem[],
  },
  geometry_name: "GEOMETRY",
  properties: {
    FID: 2386245,
    FEATURE_OBJECT_ID: 17282561,
    FEATURE_VERSION_ID: 1,
    EXTENT_NO: 1,
    VALID_FROM: "2020-03-18T23:00:00Z",
    CITATION: "0180 2020-01308",
    STREET_NAME: "Karlbergsvägen",
    CITY_DISTRICT: "Vasastaden",
    PARKING_DISTRICT: "Vasastan",
    ADDRESS: "Karlbergsvägen 18",
    VF_METER: 10,
    VF_PLATS_TYP: "Reserverad p-plats motorcykel",
    OTHER_INFO: "Servicetid tisdag 00:00-06:00",
    RDT_URL:
      "https://rdt.transportstyrelsen.se/rdt/AF06_View.aspx?BeslutsMyndighetKod=0180&BeslutadAr=2020&LopNr=01308",
    PARKING_RATE:
      "taxa 12: Vardagar utom vardag före sön- och helgdag klockan 07.00 - 21.00, vardag före sön- och helgdag klockan 9.00 - 19.00 och sön- och helgdag klockan 9.00 - 19.00, 7,75 kr/tim. Övrig tid 5 kr/tim.",
    START_TIME: 600,
    END_TIME: 0,
    START_WEEKDAY: "tisdag",
  },
};

const mockParkingRate = getParkingRates(
  mockTargetedParkingSpot?.properties?.PARKING_RATE || ""
);

const setState = jest.fn();
const useStateSpy = jest.spyOn(React, "useState");
useStateSpy.mockImplementation(((initialState: FeatureItem) => [
  initialState,
  setState,
]) as unknown as (() => [unknown, React.Dispatch<unknown>]) | undefined);

describe("Parking detail modal", () => {
  it("renders modal", () => {
    render(
      <Modal
        target={mockTargetedParkingSpot}
        openDirections={jest.fn()}
        closeModal={jest.fn()}
      />
    );

    expect(screen.getByText("Pastellvägen 12")).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(3);
  });

  describe("Rate list", () => {
    it("should format rates as xx.xx - xx.xx 2,5 kr/tim", () => {
      render(<Description target={mockTargetedParkingSpot} />);

      const list = screen.queryAllByRole("listitem");
      expect(list[0]).toHaveTextContent("Vardagar: 07.00 - 19.002,5 kr/tim");
    });

    it("should format rate with no time as x kr/tim", () => {
      render(<Description target={mockTargetedParkingSpot} />);

      const list = screen.queryAllByRole("listitem");
      expect(list[2]).toHaveTextContent("Övrig tid0 kr/tim");
    });

    // it("should hightlight current rate cost", () => {
    //   render(<Description target={mockTargetedParkingSpot} />);

    //   const list = screen.queryAllByRole("listitem");
    //   // screen.class;
    // });
  });

  describe("Current rate logic", () => {
    it("should return the current rate as weekdays when it's mon-fri and within the rate time", () => {
      expect(
        getCurrentRate(
          new Date("September 18, 2023 12:00"),
          mockParkingRate as any
        )
      ).toBe("weekdays");
      expect(
        getCurrentRate(
          new Date("September 19, 2023 17:59"),
          mockParkingRate as any
        )
      ).toBe("weekdays");
      expect(
        getCurrentRate(
          new Date("September 20, 2023 18:59"),
          mockParkingRate as any
        )
      ).toBe("weekdays");
      expect(
        getCurrentRate(
          new Date("September 21, 2023 07:00"),
          mockParkingRate as any
        )
      ).toBe("weekdays");
      expect(
        getCurrentRate(
          new Date("September 22, 2023 09:00"),
          mockParkingRate as any
        )
      ).toBe("weekdays");
    });

    it("should return the current rate as saturdays when it's a saturday and within the rate time", () => {
      expect(
        getCurrentRate(
          new Date("September 23, 2023 11:00"),
          mockParkingRate as any
        )
      ).toBe("saturdays");
      expect(
        getCurrentRate(
          new Date("September 23, 2023 16:59"),
          mockParkingRate as any
        )
      ).toBe("saturdays");
    });

    it("should return the current rate as sundays when it's a sunday and within the rate time", () => {
      const mockParkingRate = getParkingRates(
        mockTargetedParkingSpotTaxa12?.properties?.PARKING_RATE || ""
      );
      expect(
        getCurrentRate(
          new Date("September 24, 2023 09:00"),
          mockParkingRate as any
        )
      ).toBe("sundays");
      expect(
        getCurrentRate(
          new Date("September 24, 2023 18:59"),
          mockParkingRate as any
        )
      ).toBe("sundays");
    });

    it("should return the current rate as rest when outside of rate time", () => {
      expect(
        getCurrentRate(
          new Date("September 20, 2023 06:00"),
          mockParkingRate as any
        )
      ).toBe("rest");
      expect(
        getCurrentRate(
          new Date("September 23, 2023 17:01"),
          mockParkingRate as any
        )
      ).toBe("rest");
      expect(
        getCurrentRate(
          new Date("September 24, 2023 12:00"),
          mockParkingRate as any
        )
      ).toBe("rest");
    });
  });
});
