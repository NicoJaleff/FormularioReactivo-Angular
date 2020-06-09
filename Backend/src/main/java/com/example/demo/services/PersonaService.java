package com.example.demo.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.example.demo.dto.PersonaDTO;

import com.example.demo.entities.Persona;

import com.example.demo.repository.PersonaRepository;

@Service
public class PersonaService {
private PersonaRepository repository;

public PersonaService(PersonaRepository repository) {
	super();
	this.repository = repository;
}


@Transactional
public List<PersonaDTO> findAll() throws Exception {
	
	List<Persona> entities = repository.findAll();
	
	List<PersonaDTO> dtos = new ArrayList<>();

	try {
	
		for (Persona i : entities) {
			
			PersonaDTO unDto = new PersonaDTO();
			
			unDto.setId(i.getId());
			unDto.setNombre(i.getNombre());
			unDto.setApellido(i.getApellido());
			unDto.setDni(i.getDni());
			
			dtos.add(unDto);			
		}
		
		return dtos;
	
	} catch (Exception e) {
		
		throw new Exception();
		
	}

}	



@Transactional
public PersonaDTO findById(int id) throws Exception {
	
	 Optional<Persona> entityOptional = repository.findById(id);
	 
	 PersonaDTO unDto = new PersonaDTO();
	 
	try {
		
		Persona entity = entityOptional.get();	
		
		unDto.setId(entity.getId());
		unDto.setNombre(entity.getNombre());
		unDto.setApellido(entity.getApellido());
		unDto.setDni(entity.getDni());
	
	return unDto ;
		
	} catch (Exception e) {
		
		throw new Exception();
		
	}

	
}	

@Transactional
public PersonaDTO save (PersonaDTO dto) throws Exception {
	
	Persona entity = new Persona();		
	entity.setNombre(dto.getNombre());
    entity.setApellido(dto.getApellido());
    entity.setDni(dto.getDni());
	
	try {
		
		entity = repository.save(entity);
		
		dto.setId(entity.getId());
		return dto;
				
		
	} catch (Exception e) {
		
		throw new Exception();
		
	}
	
}


@Transactional
public PersonaDTO update (int id, PersonaDTO dto) throws Exception {
	
	Optional<Persona> entityOptional = repository.findById(id);
	
	
	try {
		
		   Persona entity = entityOptional.get();
		
			    entity.setId(id);
				entity.setNombre(dto.getNombre());
				entity.setApellido(dto.getApellido());
				entity.setDni(dto.getDni());

				repository.save( entity);	
				
				dto.setId(entity.getId());	
				
				return dto;
				
	
		
	} catch (Exception e) {
		
		throw new Exception();
		
	}
	
}

@Transactional
public boolean delete(int id) throws Exception {
	try {	
		if (repository.existsById(id)) {
			
			repository.deleteById(id);
			return true;				
		}		
		else {
			
			throw new Exception();			
		}
		
	} catch (Exception e) {
		
		throw new Exception();			
	}	
}

}