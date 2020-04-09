import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AboutUsTable from "./AboutUsTable";
import { listAboutUs } from "../store/aboutUs.actions";
const AboutUsList = ({ listAboutUs, aboutUsData, totalRows }) => {
  const [formData, setFormData] = useState({
    pageIndex: 1,
    pageSize: 10,
    search: "",
  });

  useEffect(() => {
    const fetchAboutUs = async () => {
      await listAboutUs({ pageIndex: 1, pageSize: 10, search: "" });
    };
    fetchAboutUs();
  }, [listAboutUs]);

  const fetchAboutUsApi = async (data) => {
    data.search = formData.search;
    await listAboutUs(data);
    setFormData({
      ...formData,
      pageIndex: data.pageIndex,
      pageSize: data.pageSize,
    });
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = async () => {
    const { pageSize, search } = formData;
    let data = {
      pageIndex: 1,
      pageSize,
      search,
    };

    await listAboutUs(data);
  };

  const handleViewAll = async (e) => {
    e.preventDefault();
    const { pageSize } = formData;
    setFormData({
      ...formData,
      search: "",
    });
    await listAboutUs({ pageIndex: 1, pageSize });
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Row>
        <Col md={12}>
          <Card>
            <CardHeader>
              <h3 className='m-0'>About Us</h3>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={3}></Col>
                <Col md={1} />
                <Col md={4}>
                  <Input
                    className='custom-input'
                    placeholder='Search by text'
                    name='search'
                    autoComplete='off'
                    value={formData.search}
                    onChange={handleInputChange}
                    onKeyPress={(e) =>
                      e.key === "Enter" ? handleSearch() : ""
                    }
                  />
                </Col>
                <Col md={4}>
                  <div className='btn-grp'>
                    <Button onClick={handleSearch} className='btn-yellow'>
                      Search
                    </Button>
                    <Button onClick={handleViewAll} className='btn-black'>
                      View All{" "}
                    </Button>
                    <Link
                      style={{ display: "inline-block" }}
                      className='btn btn-black'
                      to='/aboutus/add'
                    >
                      Add About Us
                    </Link>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg='12'>
                  <AboutUsTable
                    data={aboutUsData}
                    totalRows={totalRows}
                    fetchAboutUsApi={fetchAboutUsApi}
                    pageSize={formData.pageSize}
                    pageIndex={formData.pageIndex}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = ({ aboutUs }) => ({
  aboutUsData: aboutUs.aboutList,
  totalRows: aboutUs.totalRows,
});

const mapDispatchToProps = {
  listAboutUs,
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutUsList);
