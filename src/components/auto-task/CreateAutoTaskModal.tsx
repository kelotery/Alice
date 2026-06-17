import React, { useState } from "react";
import { createPortal } from "react-dom";
import ScheduleTypeDropdown from "./ScheduleTypeDropdown";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import type { AutoTaskScheduleType, AutoTask } from "../../store/autoTaskStore";
import { useAutoTask } from "../../store/autoTaskStore";

const CreateAutoTaskModal: React.FC = () => {
  const { state, closeCreateTaskModal, createAutoTask } = useAutoTask();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [scheduleType, setScheduleType] = useState<AutoTaskScheduleType>("once");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  if (!state.createTaskModalOpen) return null;

  const validate = (): boolean => {
    const errs: string[] = [];
    if (!name.trim()) errs.push("名称不能为空");
    if (!description.trim()) errs.push("要求说明不能为空");
    if (scheduleType === "once") { if (!date) errs.push("单次任务必须选择日期"); if (!time) errs.push("单次任务必须选择时间"); }
    if (scheduleType === "daily" || scheduleType === "weekly") { if (!time) errs.push("必须选择时间"); }
    setErrors(errs); return errs.length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    createAutoTask({ name: name.trim(), description: description.trim(), scheduleType, date: date || undefined, time: time || undefined } as Omit<AutoTask, "id" | "createdAt" | "updatedAt" | "status">);
    resetForm();
  };

  const resetForm = () => { setName(""); setDescription(""); setScheduleType("once"); setDate(""); setTime(""); setErrors([]); };

  const content = (
    <div className="modal-overlay" onClick={closeCreateTaskModal}>
      <div className="modal-content modal-content--at" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header"><h2 className="modal-title">新建自动任务</h2><button className="modal-close-btn" onClick={closeCreateTaskModal}>✕</button></div>
        {errors.length > 0 && (<div className="modal-errors">{errors.map((e, i) => <div key={i} className="modal-error-item">{e}</div>)}</div>)}
        <label className="modal-field">
          <span className="modal-label">名称 <span className="modal-required">*</span></span>
          <div className="modal-input-wrap"><input className="modal-input" placeholder="请输入任务名称" value={name} maxLength={50} onChange={(e) => setName(e.target.value)} /><span className="modal-count">{name.length}/50</span></div>
        </label>
        <label className="modal-field">
          <span className="modal-label">要求说明 <span className="modal-required">*</span></span>
          <div className="modal-input-wrap"><textarea className="modal-textarea modal-textarea--compact" placeholder="请输入任务要求说明" value={description} maxLength={8000} onChange={(e) => setDescription(e.target.value)} rows={4} /><span className="modal-count modal-count--tr">{description.length}/8000</span></div>
        </label>
        <div className="modal-field">
          <span className="modal-label">执行时间 <span className="modal-required">*</span></span>
          <div className="modal-schedule-row">
            <ScheduleTypeDropdown value={scheduleType} onChange={setScheduleType} />
            {scheduleType !== "nonScheduled" && (<>{scheduleType === "once" && <DatePicker value={date} onChange={setDate} />}<TimePicker value={time} onChange={setTime} /></>)}
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-btn modal-btn--cancel" onClick={closeCreateTaskModal}>取消</button>
          <button className="modal-btn modal-btn--confirm" onClick={handleSubmit}>确定</button>
        </div>
      </div>
    </div>
  );
  return createPortal(content, document.body);
};

export default CreateAutoTaskModal;
