package com.pajeroparts.DTO;

public class FrameSearchRequest {
    private String frame;

    public FrameSearchRequest() {}

    public FrameSearchRequest(String frame) {
        this.frame = frame;
    }

    public String getFrame() { return frame; }
    public void setFrame(String frame) { this.frame = frame; }
}