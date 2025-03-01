package domain.binaryApp.binary_converter.controller;

import java.util.Map;
import java.util.Random;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class BinaryController {
	
	private final Random random =  new Random();
	
	@GetMapping("/generate")
	public Map<String, String> generateBinary(){
		int decimal = random.nextInt(256);
		String binary =  Integer.toBinaryString(decimal);
		return Map.of("binary", binary, "decimal", String.valueOf(decimal));
	}
}
