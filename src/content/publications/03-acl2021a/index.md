---
title: "Guiding Teacher Forcing with Seer Forcing for Neural Machine Translation"
summary: "Experimental results show the method can outperform competitive baselines significantly and achieves greater improvements on the bigger data sets and proves knowledge distillation the best way to transfer knowledge from the seer decoder to the conventional decoder compared to adversarial learning and L2 regularization."
abstract: "Although teacher forcing has become the main training paradigm for neural machine translation, it usually makes predictions only conditioned on past information, and hence lacks global planning for the future. To address this problem, we introduce another decoder, called seer decoder, into the encoder-decoder framework during training, which involves future information in target predictions. Meanwhile, we force the conventional decoder to simulate the behaviors of the seer decoder via knowledge distillation. In this way, at test the conventional decoder can perform like the seer decoder without the attendance of it. Experiment results on the Chinese-English, English-German and English-Romanian translation tasks show our method can outperform competitive baselines significantly and achieves greater improvements on the bigger data sets. Besides, the experiments also prove knowledge distillation the best way to transfer knowledge from the seer decoder to the conventional decoder compared to adversarial learning and L2 regularization."
authors:
- Yang Feng
- Shuhao Gu
- Dengji Guo
- Zhengxin Yang
- Chenze Shao
position: "ACL 2021"
date: "Jun 12 2021"
tags:
- Neural Machine Translation
- Natural Language Processing
type: "Conference"
draft: false
select: false
arxivLink: "https://arxiv.org/abs/2106.06751"
officialLink: "https://aclanthology.org/2021.acl-long.223/"
---

TLDR: Experimental results show the method can outperform competitive baselines significantly and achieves greater improvements on the bigger data sets and proves knowledge distillation the best way to transfer knowledge from the seer decoder to the conventional decoder compared to adversarial learning and L2 regularization.