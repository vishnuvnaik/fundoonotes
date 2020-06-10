import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Registration from "../component/registration";
configure({ adapter: new Adapter() });

describe("Registration Component", () => {
    it("should render without throwing an error", () => {
      expect(shallow(<Registration />).exists()).toBe(true);
    });
});