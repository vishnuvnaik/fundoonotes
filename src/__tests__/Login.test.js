import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Login from "../component/login";

configure({ adapter: new Adapter() });

describe("Test case for testing login component", () => {
  it("Email Textfield", () => {
    expect(shallow(<Login />).find("#emailLogin").length).toEqual(1);
  });
  it("Password Textfield", () => {
    expect(shallow(<Login />).find("#passLogin").length).toEqual(1);
  });
});
