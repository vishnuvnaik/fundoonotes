import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Reset from "../component/ResetPassword";

configure({ adapter: new Adapter() });
describe("Reset Component", () => {
  it("should render without throwing an error", () => {
    expect(shallow(<Reset />).exists()).toBe(true);
  });
  describe("Validate input fields", () => {
    it("input of password", () => {
      const wrapper = shallow(<Reset />);
      wrapper.find("#newPass").simulate("change", {
        target: { name: "NewPassword", value: "qwertyuiop" },
      });
      expect(wrapper.state("password")).toEqual("qwertyuiop");
    });
    it("Should Respond to change event and change the Password state.", () => {
      const wrapper = shallow(<Reset />);
      wrapper.find("#confPass").simulate("change", {
        target: {
          name: "Re-enter New Password",
          value: "qwertyuiop",
        },
      });
      expect(wrapper.state("confirmPassword")).toEqual("qwertyuiop");
    });
    it("should respond to button click", () => {});
  });
});
describe("Test case for testing login component", () => {
  it("Email Textfield", () => {
    expect(shallow(<Reset />).find("#newPAss").length).toEqual(1);
  });
  it("Password Textfield", () => {
    expect(shallow(<Reset />).find("#confPass").length).toEqual(1);
  });
});
