import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("StudentManagement", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployStudentManagement() {
    // Contracts are deployed using the first signer/account by default
    const [owner, account1, account2, account3] = await hre.ethers.getSigners();

    const studentManagement = await hre.ethers.getContractFactory(
      "StudentManagement"
    );

    const studentManagementContract = await studentManagement.deploy();

    return { studentManagementContract, owner, account1, account2, account3 };
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { studentManagementContract, owner, account1, account2, account3 } =
        await loadFixture(deployStudentManagement);

      expect(await studentManagementContract.owner()).to.not.eq(account1);

      expect(await studentManagementContract.owner()).to.eq(owner);
    });

    // it("Should test for register student", async function () {
    //   const {
    //     studentManagementContract,
    //     owner,
    //     account1,
    //     account2,
    //     account3
    //    } = await loadFixture(deployStudentManagement);

    //   const name = "john doe";
    //   const age = 12;
    //   const studentClass = "js1";
    //   const gender = 0;

    //   const studentId = await studentManagementContract.studentId();
    //   await expect(studentManagementContract.registerStudent(
    //     name,
    //     age,
    //     studentClass,
    //     gender
    //   )).to.emit(
    //     studentManagementContract,
    //     "CreatedStudent"
    //   ).withArgs(name, age, studentClass, gender);

    // });

    it("Should test for register student", async function () {
      const { studentManagementContract, owner, account1, account2, account3 } =
        await loadFixture(deployStudentManagement);

      const name = "john doe";
      const age = 12;
      const studentClass = "js1";
      const gender = 0;

      await studentManagementContract.registerStudent(
        name,
        age,
        studentClass,
        gender
      );

      const student = await studentManagementContract.getStudent(1);
      expect(await student.name).to.eq("john doe");

      console.log(student);
    });

    it("Should test for student", async function () {
      const { studentManagementContract, owner, account1, account2, account3 } =
        await loadFixture(deployStudentManagement);

      const name = "john doe";
      const age = 12;
      const studentClass = "js1";
      const gender = 0;

      await studentManagementContract.registerStudent(
        name,
        age,
        studentClass,
        gender
      );

      const student = await studentManagementContract.getStudent(1);
      expect(await student.name).to.eq("john doe");

      console.log(student);
    });

    it("Should give custom error when getting a student that does not exist", async function () {
      const { studentManagementContract, owner, account1, account2, account3 } =
        await loadFixture(deployStudentManagement);

      const name = "john doe";
      const age = 12;
      const studentClass = "js1";
      const gender = 0;

      await studentManagementContract.registerStudent(
        name,
        age,
        studentClass,
        gender
      );

      await expect(
        studentManagementContract.getStudent(5)
      ).to.be.revertedWithCustomError(
        studentManagementContract,
        "CouldNotGetStudent()"
      );
    });

    it("Should fail when registering student with non admin account", async function () {
      const { studentManagementContract, owner, account1, account2, account3 } =
        await loadFixture(deployStudentManagement);

      const name = "john doe";
      const age = 12;
      const studentClass = "js1";
      const gender = 0;

      await expect(
        studentManagementContract
          .connect(account1)
          .registerStudent(name, age, studentClass, gender)
      ).to.be.revertedWith("You are not the admin");
    });

    it("Should test for a student registered", async function () {
      const { studentManagementContract, owner, account1, account2, account3 } =
        await loadFixture(deployStudentManagement);

      const name = "john doe";
      const age = 12;
      const studentClass = "js1";
      const gender = 0;

      await studentManagementContract.registerStudent(name, age, studentClass, gender)

      const studentId = await studentManagementContract.studentId();

      const getStudentById = await studentManagementContract.getStudent(studentId);

      // await expect(getStudentById).to.eq();
    });

    it("Should test for all students registered", async function () {
      const { studentManagementContract, owner, account1, account2, account3 } =
        await loadFixture(deployStudentManagement);

      const name = "john doe";
      const age = 12;
      const studentClass = "js1";
      const gender = 0;

      const name1 = "mary doe";
      const age1 = 12;
      const studentClass1 = "js1";
      const gender1 = 1;


      
      
    });
  });
});
