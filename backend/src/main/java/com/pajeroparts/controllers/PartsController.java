package com.pajeroparts.controllers;

import com.pajeroparts.DTO.ApiResponse;
import com.pajeroparts.DTO.DiagramDTO;
import com.pajeroparts.DTO.GroupDTO;
import com.pajeroparts.DTO.SubGroupDTO;
import com.pajeroparts.Service.PajeroPartsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parts")
@CrossOrigin(origins = "*")
public class PartsController {

    @Autowired
    private PajeroPartsService pajeroPartsService;

    @GetMapping("/search")
    public ApiResponse<List<GroupDTO>> searchByFrame(@RequestParam String frame) {
        return pajeroPartsService.searchByFrame(frame);
    }

    @GetMapping("/groups/{groupId}/subgroups")
    public ApiResponse<List<SubGroupDTO>> getSubGroups(@PathVariable Long groupId) {
        return pajeroPartsService.getSubGroups(groupId);
    }

    @GetMapping("/diagrams/{subGroupId}")
    public ApiResponse<DiagramDTO> getDiagram(@PathVariable Long subGroupId) {
        return pajeroPartsService.getDiagramBySubGroup(subGroupId);
    }

    @GetMapping("/oem/{oemNumber}")
    public ApiResponse<?> getOemPart(@PathVariable String oemNumber) {
        return pajeroPartsService.getOemPart(oemNumber);
    }
    @GetMapping("/ping")
    public String ping() {
        return "PajeroParts API is working!";
    }
}