import React from "react";
import { Navigate } from "../../Navigate";
import {
  Form,
  InputNumber,
  DatePicker,
  TimePicker,
  message,
  Input,
  Spin,
} from "antd";
import dayjs from "dayjs";
import { useAddShiftRequestMutation } from "../redux/api/manageShiftApi";
import { useParams } from "react-router-dom";

const AddManageShift = () => {
  const { id } = useParams();
  const [addManageShift, { isLoading }] = useAddShiftRequestMutation();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      // ✅ combine date + time
      const startDateTime = dayjs(values.date)
        .hour(dayjs(values.startTime).hour())
        .minute(dayjs(values.startTime).minute())
        .toISOString();

      const endDateTime = dayjs(values.endDate)
        .hour(dayjs(values.endTime).hour())
        .minute(dayjs(values.endTime).minute())
        .toISOString();

      // ✅ final payload
      const payload = {
        bartender: id,
        startDateTime,
        endDateTime,
        note: values.note,
        shiftRate: values.rate,
      };

      // 🔥 API call
      const res = await addManageShift(payload).unwrap();

      message.success(res?.message || "Shift request sent successfully!");
      form.resetFields();
    } catch (error) {
      message.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-3 h-[87vh] overflow-auto">
      <Navigate title="Manage Shifts" />

      <div className="mt-6 border text-white border-[#2A2448] rounded-xl space-y-3">
        <div className="border-b border-[#2A2448] p-3">
          <h1 className="text-[18px] italic font-semibold pb-1">
            Send Shift Request
          </h1>
          <p className="text-[#C9C6D6] italic">
            Invite this bartender to work your upcoming shift.
          </p>
        </div>

        <div className="p-4">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="custom-form"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Start Date */}
              <Form.Item
                label="Start Date"
                name="date"
                rules={[{ required: true, message: "Select start date" }]}
              >
                <DatePicker className="custom-input1 w-full" />
              </Form.Item>

              {/* Start Time */}
              <Form.Item
                label="Start Time"
                name="startTime"
                rules={[{ required: true, message: "Select start time" }]}
              >
                <TimePicker className="custom-input w-full" format="HH:mm" />
              </Form.Item>

              {/* End Date */}
              <Form.Item
                label="End Date"
                name="endDate"
                rules={[{ required: true, message: "Select end date" }]}
              >
                <DatePicker className="custom-input1 w-full" />
              </Form.Item>

              {/* End Time */}
              <Form.Item
                label="End Time"
                name="endTime"
                rules={[{ required: true, message: "Select end time" }]}
              >
                <TimePicker className="custom-input w-full" format="HH:mm" />
              </Form.Item>

              {/* Rate */}
              <Form.Item
                label="Enter Shift Rate ($)"
                name="rate"
                rules={[{ required: true, message: "Enter shift rate" }]}
              >
                <InputNumber
                  className="custom-input w-full"
                  min={0}
                  placeholder="Enter shift rate"
                />
              </Form.Item>

              {/* Note */}
              <Form.Item
                label="Message"
                name="note"
                rules={[{ required: true, message: "Enter message" }]}
              
              >
                <Input.TextArea
                  className="custom-input"
                  placeholder="Type your message..."
                  autoSize={{ minRows: 4 }}
                />
              </Form.Item>
            </div>

            <Form.Item>
              <button
            type="submit"
                disabled={isLoading}
                className={` py-3 rounded-full px-4 text-white flex justify-center items-center gap-2 ${
                  isLoading ? "bg-[#b879ff]" : "bg-[#822CE7] hover:bg-[#4a0e8f]"
                }`}
              >
                {isLoading ? (
                  <>
                    <Spin size="small" />
                    <span>Adding...</span>
                  </>
                ) : (
                  "Add Manage Shift"
                )}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddManageShift;