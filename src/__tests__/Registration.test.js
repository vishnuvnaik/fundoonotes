import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Registration from "../component/registration";
configure({ adapter: new Adapter() });

describe("Registration Component", () => {
  it("should render without throwing an error", () => {
    expect(shallow(<Registration />).exists()).toBe(true);
  });
  describe("Validate input field for email", () => {
    it("input of email", () => {
      const wrapper = shallow(<Registration />);
      wrapper.find("#firstBut").simulate("change", {
        target: { name: "firstname", value: "vishnuvnaik" },
      });
      expect(wrapper.state("firstName")).toEqual("vishnuvnaik");
    });
    it("Should Respond to change event of password state", () => {
      const wrapper = shallow(<Registration />);
      wrapper.find("#lastBut").simulate("change", {
        target: {
          name: "lastname",
          value: "nameisname",
        },
      });
      expect(wrapper.state("lastName")).toEqual("nameisname");
    });
    it("input of email", () => {
      const wrapper = shallow(<Registration />);
      wrapper.find("#emailReg").simulate("change", {
        target: { name: "email", value: "vishnuvnaik@hotmail.com" },
      });
      expect(wrapper.state("email")).toEqual("vishnuvnaik@hotmail.com");
    });
    it("Should Respond to change event and change the Password state.", () => {
      const wrapper = shallow(<Registration />);
      wrapper.find("#passReg").simulate("change", {
        target: {
          name: "password",
          value: "qwertyuiop",
        },
      });
      expect(wrapper.state("password")).toEqual("qwertyuiop");
    });
  });
});
describe("Test case for testing registration component", () => {
  it("firstname Textfield", () => {
    expect(shallow(<Registration />).find("#firstBut").length).toEqual(1);
  });
  it("lastname Textfield", () => {
    expect(shallow(<Registration />).find("#lastBut").length).toEqual(1);
  });

});
