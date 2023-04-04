---
weight: 1
---
# Introduction

**Color vision deficiency (CVD)**, commonly called **"color blindness"**, affects a significant portion of the population, with ~8% of males and ~0.4% of females being affected. This condition can lead to difficulty in distinguishing colors, which can pose challenges in several aspects of daily life. Thus, there is a pressing need to accurately simulate and correct CVD, which can be useful in several ways. Firstly, it can help in raising awareness about the issue and promoting a better understanding of the challenges faced by people with CVD. Secondly, it can be helpful for designers in choosing color schemes that are accessible to everyone, including those with CVD. Thirdly, it can aid in the creation of tools to enhance images and help individuals with CVD in their daily tasks. Most correction tools start by simulating how a person with CVD would see the image, and then find ways to spread the lost information into the channels that are better perceived or play with the light intensity to restore contrast. Developing accurate and effective correction tools can greatly improve the quality of life for individuals with CVD, making tasks such as reading, identifying objects, and driving safer and more manageable. Therefore, the development of accurate simulation methods for CVD and effective correction tools is critical in improving accessibility and creating a more inclusive environment for individuals with color vision deficiencies.

Limitations were found in models used to simulate color perception deficiencies, such as dichromacy and anomalous trichromacy. These models are based on average observers and do not take into account individual variations in color perception, nor the plasticity of the brain that can adapt color perception at higher levels. Validation experiments are typically conducted on small populations, and tritanopes are rarely evaluated due to their rarity. Additionally, the accuracy of the stimuli displayed on uncalibrated computer screens with non-normal background illuminations may be affected. The severity of color deficiencies can also vary depending on the size of the field of view, with small objects being more difficult to identify. 

There is no cure for CVD, there are certain aids available that can help people with this condition, including special lenses. However, lenses for CVD can be very expensive and the companies that offer these physical correction tools do not hand a product that can be graduated in function of the severity of CVD and does not exist lenses for tritanopia. In addition, while lenses can be effective, they are not a cure for this condition. There are other technologies that could help people with CVD that are more affordable and accessible at least in virtual environments with the use of screens. In these virtual environments, the best tool we have found is offered by Epic Games for the video game **Fortnite**, since it has a wider variety of settings, including type of color blindness and severity of color blindness, even so, color corrections that are available with current technology tend to be imprecise, especially for tritanopia. 

The objective of this article is to present the development of two tools, one for simulating and the other one for correcting CVD, which can facilitate the differentiation of colors depending on the user's needs and contexts.

![Fortnite color blindness mode](/showcase/images/image.jpg)



# Color Blindness Types

## 1. Red- green type
					

### Protanomaly
    
Due to the unusual occurrence of red cone pigments. In this type, red, orange, and yellow appear green, and the colors are not bright. This condition is benign and usually does not affect daily life.

### Protanopia 

In this type, the red cone pigments stop working, and the red will appears as black. Some variants of orange, yellow and green all appear as yellow.

Some opticians prefer to use a reverse color blind test to diagnose colour vision deficiency. In this test, the patients are asked to identify the coloured object in the pallet within dynamic colored background.

### Deuteranomaly

This is the most common type found in people. It has an unusual green cone pigment. Yellow and green appear as red, purple and blue are difficult to identify. This condition is benign and usually does not affect daily life.

### Deuteranopia 
In this, green cone pigments stop working. They see red colors as brownish-yellow and green as dark yellow.

## 2. Blue-Yellow Type

Blue-yellow type is rarer than red-green. In this, the blue cone pigment (triton) is either absent or has a limited function. There are two types of blue-yellow type.

### Tritanomaly 
Blue cone pigments have less function. The blue color appears as green, and it cannot be easy to differentiate from pink to yellow and red.

### Tritanopia 
People with Tritanopia lack blue cone cells. Blue appears green in this, and the yellow color looks like purple or light brown.

## 3. Full (Monochromacy) Type

People with full type (monochromacy) do not see any colors, and their clarity of vision can also be affected. There are two types of monochromacy

### Cone monochromacy

In this, two or three cone cell pigments do not work. People with cone monochromacy have difficulty distinguishing between colors because the brain needs signals from different types of cones to see. This comparison is not possible when only one type of cone works.

### Rod Monochromacy

It is present from birth. It does not contain any of the available pigments of cone cells. People with rod monochromacy see the world in black, white, and gray. People with rod monochromacy are photophobic and very uncomfortable in bright environments.

{{< p5-iframe sketch="/showcase/sketches/color_blindness.js" width="735" height="425">}}

